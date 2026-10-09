import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">

        <div className="empty-cart">

          <ShoppingBag size={60} />

          <h1>Your Cart is Empty</h1>

          <p>
            Looks like you haven't added anything to
            your cart yet.
          </p>

          <button
            className="continue-shopping"
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="cart-page">

      <div className="cart-container">

        {/* Page Header */}

        <div className="cart-header">

          <p className="cart-label">
            CASANEST
          </p>

          <h1>Your Shopping Cart</h1>

          <p>
            Review your selected home décor pieces
            before checkout.
          </p>

        </div>

        {/* Cart Content */}

        <div className="cart-content">

          {/* Cart Items */}

          <div className="cart-items">

            {cartItems.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                {/* Image */}

                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                {/* Information */}

                <div className="cart-item-info">

                  <p className="cart-item-category">
                    {item.category}
                  </p>

                  <h2>{item.name}</h2>

                  <p className="cart-item-price">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>

                  {/* Quantity */}

                  <div className="cart-quantity">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity === 1}
                    >
                      <Minus size={16} />
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                      disabled={
                        item.quantity === item.stock
                      }
                    >
                      <Plus size={16} />
                    </button>

                  </div>

                </div>

                {/* Item Total */}

                <div className="cart-item-right">

                  <p className="cart-item-total">
                    ₹
                    {(
                      item.price * item.quantity
                    ).toLocaleString("en-IN")}
                  </p>

                  <button
                    className="remove-item"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* Cart Summary */}

          <div className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">

              <span>
                Items
              </span>

              <span>
                {cartItems.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}
              </span>

            </div>

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <span>
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>

            </div>

            <div className="summary-row">

              <span>
                Delivery
              </span>

              <span>
                Free
              </span>

            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{cartTotal.toLocaleString("en-IN")}
              </strong>

            </div>

            <button
              className="checkout-button"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

            <button
              className="continue-shopping-link"
              onClick={() => navigate("/shop")}
            >
              Continue Shopping
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;