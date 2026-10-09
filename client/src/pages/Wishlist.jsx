import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <main className="page simple-page">
        <div className="empty-state">
          <Heart size={52} />
          <h1>Your Wishlist is empty</h1>
          <p>Save a few favourites and they will appear here.</p>
          <button className="primary-button" onClick={() => navigate("/shop")}>Continue Shopping</button>
        </div>
      </main>
    );
  }

  return (
    <main className="page simple-page">
      <div className="section-heading">
        <p className="eyebrow">FAVOURITES</p>
        <h1>My Wishlist</h1>
      </div>

      <div className="listing-grid">
        {wishlistItems.map((product) => (
          <div className="item-card" key={product.id}>
            <div className="item-image-wrap" onClick={() => navigate(`/product/${product.id}`)}>
              <img src={product.image} alt={product.name} className="item-image" />
            </div>

            <div className="item-body">
              <p className="category-pill">{product.category}</p>
              <h3>{product.name}</h3>
              <div className="mini-rating">
                <Star size={15} fill="currentColor" />
                <span>{product.rating}</span>
              </div>
              <p className="item-price">₹{product.price.toLocaleString("en-IN")}</p>

              <div className="item-actions">
                <button className="secondary-button" onClick={() => removeFromWishlist(product.id)}>Remove</button>
                <button className="primary-button" onClick={() => addToCart(product, 1)}>
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cta-row">
        <Link to="/shop" className="secondary-link">Continue Shopping</Link>
      </div>
    </main>
  );
}

export default Wishlist;
