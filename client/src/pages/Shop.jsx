import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import "./shop.css";
const categories = [
  "All Categories",
  "Living Room",
  "Bedroom",
  "Lighting & Candles",
  "Plants & Planters",
  "Wall Décor",
  "Dining & Kitchen",
];
const rooms = ["All Rooms", "Living Room", "Bedroom", "Dining Room", "Kitchen", "Balcony"];
const styles = ["All Styles", "Minimal", "Modern", "Boho", "Contemporary", "Vintage", "Rustic", "Scandinavian", "Natural", "Traditional"];
function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedRoom, setSelectedRoom] = useState("All Rooms");
  const [selectedStyle, setSelectedStyle] = useState("All Styles");
  const [sortOption, setSortOption] = useState("default");
  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.room.toLowerCase().includes(query) ||
        product.style.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
      const matchesRoom = selectedRoom === "All Rooms" || product.room === selectedRoom;
      const matchesStyle = selectedStyle === "All Styles" || product.style === selectedStyle;
      return matchesSearch && matchesCategory && matchesRoom && matchesStyle;
    });
    switch (sortOption) {
      case "price-low":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...result].sort((a, b) => b.price - a.price);
      case "rating":
        return [...result].sort((a, b) => b.rating - a.rating);
      case "name":
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return result;
    }
  }, [searchTerm, selectedCategory, selectedRoom, selectedStyle, sortOption]);
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setSelectedRoom("All Rooms");
    setSelectedStyle("All Styles");
    setSortOption("default");
  };
  return (
    <div className="shop-page">
      <section className="shop-header">
        <p className="shop-label">CASANEST COLLECTION</p>
        <h1>Shop Home Décor</h1>
        <p>Explore elegant essentials for every room, designed to make your home feel warm, personal and complete.</p>
      </section>
      <section className="shop-products">
        <div className="shop-controls">
          <div className="search-box">
            <Search size={19} />
            <input
              type="text"
              placeholder="Search by name, category, room, or style"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div className="filter-box">
            <SlidersHorizontal size={18} />
            <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="filter-box">
            <select value={selectedRoom} onChange={(event) => setSelectedRoom(event.target.value)}>
              {rooms.map((room) => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
          </div>
          <div className="filter-box">
            <select value={selectedStyle} onChange={(event) => setSelectedStyle(event.target.value)}>
              {styles.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
          <div className="filter-box">
            <select value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
              <option value="default">Default</option>
              <option value="price-low">Price Low to High</option>
              <option value="price-high">Price High to Low</option>
              <option value="rating">Rating High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
        <div className="shop-products-header">
          <h2>{selectedCategory === "All Categories" ? "All Products" : selectedCategory}</h2>
          <span>{filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}</span>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try changing your search, category, room, or style filters.</p>
            <button type="button" className="secondary-button clear-filters-btn" onClick={clearFilters}>Clear Filters</button>
          </div>
        )}
      </section>
    </div>
  );
}
export default Shop;