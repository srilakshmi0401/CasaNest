import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Star,
  ArrowLeft,
} from "lucide-react";
import products from "../data/products";
import "./ProductDetails.css";
function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const product = products.find(
    (item) => item.id === Number(id)
  );
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate("/shop")}>
          Back to Shop
        </button>
      </div>
    );
  }
  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };
  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(product.stock, current + 1)
    );
  };
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  return (
    <div className="product-details-page">
      <div className="product-details-container">
        {/* Back to Shop */}
        <button
          className="back-to-shop"
          onClick={() => navigate("/shop")}
        >
          <ArrowLeft size={18} />
          Back to Shop
        </button>
        <div className="product-details">
          {/* =========================
              PRODUCT IMAGE
          ========================= */}
          <div className="product-details-image-section">
            <div className="product-details-image-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="product-details-image"
              />
            </div>
          </div>
          {/* =========================
              PRODUCT INFORMATION
          ========================= */}
          <div className="product-details-info">
            {/* Category */}
            <p className="details-category">
              {product.category}
            </p>
            {/* Product Name */}
            <h1>{product.name}</h1>
            {/* Rating */}
            <div className="details-rating">
              <Star
                size={18}
                fill="currentColor"
              />
              <span>{product.rating}</span>
              <span className="rating-text">
                Customer Rating
              </span>
            </div>
            {/* Price */}
            <p className="details-price">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
            {/* Description */}
            <p className="details-description">
              {product.description}
            </p>
            {/* Product Information */}
            <div className="product-meta">
              <div>
                <span>Room</span>
                <strong>{product.room}</strong>
              </div>
              <div>
                <span>Style</span>
                <strong>{product.style}</strong>
              </div>
              <div>
                <span>Stock</span>
                <strong>
                  {product.stock} available
                </strong>
              </div>
            </div>
            {/* =========================
                QUANTITY
            ========================= */}
            <div className="quantity-section">
              <span>Quantity</span>
              <div className="quantity-controls">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  disabled={
                    quantity === product.stock
                  }
                >
                  +
                </button>
              </div>
            </div>
            {/* =========================
                ACTION BUTTONS
            ========================= */}
            <div className="details-actions">
              {/* Wishlist */}
              <button
                className="details-wishlist"
                onClick={() =>
                  setLiked(!liked)
                }
              >
                <Heart
                  size={20}
                  fill={
                    liked
                      ? "currentColor"
                      : "none"
                  }
                />
                {liked
                  ? "Added to Wishlist"
                  : "Add to Wishlist"}
              </button>
              {/* Add to Cart */}
              <button
                className="details-cart"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;