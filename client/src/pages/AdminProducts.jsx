import { useEffect, useState } from "react";
import productService from "../services/productService";

const EMPTY_FORM = {
  name: "",
  price: "",
  description: "",
  category: "Living Room",
  room: "Living Room",
  style: "Minimal",
  stock: "",
  rating: "4.5",
  image: "",
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const response = await productService.getProducts();
      const list = Array.isArray(response) ? response : response.products || [];
      setProducts(list);
    } catch (error) {
      setMessage("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: Number(formData.rating),
      };

      if (editingId) {
        await productService.updateProduct(editingId, payload);
        setMessage("Product updated successfully.");
      } else {
        await productService.createProduct(payload);
        setMessage("Product added successfully.");
      }

      setFormData(EMPTY_FORM);
      setEditingId(null);
      await loadProducts();
    } catch (error) {
      setMessage(error.response?.data?.message || "Product action failed.");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      room: product.room,
      style: product.style,
      stock: product.stock,
      rating: product.rating,
      image: product.image,
    });
  };

  const handleDelete = async (id) => {
    try {
      await productService.deleteProduct(id);
      setMessage("Product deleted successfully.");
      await loadProducts();
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to delete product.");
    }
  };

  return (
    <main className="page simple-page admin-page">
      <div className="section-heading">
        <p className="eyebrow">ADMIN PRODUCTS</p>
        <h1>Manage Products</h1>
      </div>

      {message && <p className="status-message">{message}</p>}

      <div className="admin-grid">
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit Product" : "Add Product"}</h2>

          <div className="form-group">
            <label>Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input name="price" type="number" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option>Living Room</option>
              <option>Bedroom</option>
              <option>Lighting &amp; Candles</option>
              <option>Plants &amp; Planters</option>
              <option>Wall Décor</option>
              <option>Dining &amp; Kitchen</option>
            </select>
          </div>
          <div className="form-group">
            <label>Room</label>
            <input name="room" value={formData.room} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Style</label>
            <input name="style" value={formData.style} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input name="stock" type="number" value={formData.stock} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <input name="rating" type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input name="image" value={formData.image} onChange={handleChange} placeholder="use local asset path" />
          </div>

          <button type="submit" className="primary-button">{editingId ? "Save Changes" : "Add Product"}</button>
        </form>

        <div className="product-manager-list">
          {loading ? <p className="status-message">Loading products...</p> : products.map((product) => (
            <div key={product.id} className="manager-product-item">
              <div className="manager-product-copy">
                <strong>{product.name}</strong>
                <span>₹{Number(product.price).toLocaleString("en-IN")}</span>
              </div>
              <div className="manager-actions">
                <button className="secondary-button" onClick={() => handleEdit(product)}>Edit</button>
                <button className="ghost-button" onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default AdminProducts;
