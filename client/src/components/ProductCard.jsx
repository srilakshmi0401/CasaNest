import { Heart, ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./ProductCard.css";
function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const liked = isWishlisted(product.id);
  const openProductDetails = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <div className="product-card">
      <div className="product-image-container" onClick={openProductDetails}>
        <img src={product.image} alt={product.name} className="product-image" />
        <button
          type="button"
          className={`wishlist-button ${liked ? "liked" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label="Add to wishlist"
        >
          <Heart size={20} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name" onClick={openProductDetails}>
          {product.name}
        </h3>
        <div className="product-rating">
          <Star size={16} fill="currentColor" />
          <span>{product.rating}</span>
        </div>
        <div className="product-bottom">
          <p className="product-price">₹{product.price.toLocaleString("en-IN")}</p>
          <button type="button" className="add-cart-button" onClick={() => addToCart(product, 1)}>
            <ShoppingCart size={17} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;