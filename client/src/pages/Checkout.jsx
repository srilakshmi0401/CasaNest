import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import orderService from "../services/orderService";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    return (
      <main className="page simple-page">
        <div className="empty-state">
          <h1>Please log in to continue</h1>
          <p>Sign in to complete your order.</p>
          <button className="primary-button" onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="page simple-page">
        <div className="empty-state">
          <h1>Your cart is empty</h1>
          <p>Choose a few beautiful pieces before checkout.</p>
          <button className="primary-button" onClick={() => navigate("/shop")}>Continue Shopping</button>
        </div>
      </main>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email";
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required";
    if (!form.address.trim()) nextErrors.address = "Address is required";
    if (!form.city.trim()) nextErrors.city = "City is required";
    if (!form.state.trim()) nextErrors.state = "State is required";
    if (!form.pincode.trim()) nextErrors.pincode = "Pincode is required";

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        user_id: user.id,
        customer_name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        total_amount: cartTotal,
        status: "Placed",
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const result = await orderService.createOrder(orderPayload);
      clearCart();
      navigate(`/order-success?orderId=${result.order.id}&total=${cartTotal}`);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || "Order could not be placed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page simple-page checkout-page">
      <div className="section-heading">
        <p className="eyebrow">CHECKOUT</p>
        <h1>Complete Your Order</h1>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="input-grid">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" value={form.address} onChange={handleChange} />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input id="city" name="city" value={form.city} onChange={handleChange} />
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input id="state" name="state" value={form.state} onChange={handleChange} />
              {errors.state && <span className="error-text">{errors.state}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input id="pincode" name="pincode" value={form.pincode} onChange={handleChange} />
              {errors.pincode && <span className="error-text">{errors.pincode}</span>}
            </div>
          </div>

          {errors.submit && <p className="error-banner">{errors.submit}</p>}

          <button type="submit" className="primary-button checkout-submit" disabled={isSubmitting}>
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="checkout-item-row">
              <div>
                <strong>{item.name}</strong>
                <p>Qty: {item.quantity}</p>
              </div>
              <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
            </div>
          ))}

          <div className="summary-line">
            <span>Subtotal</span>
            <strong>₹{cartTotal.toLocaleString("en-IN")}</strong>
          </div>
          <div className="summary-line">
            <span>Delivery</span>
            <strong>Free</strong>
          </div>
          <div className="summary-line total-line">
            <span>Total</span>
            <strong>₹{cartTotal.toLocaleString("en-IN")}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;
