import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import orderService from "../services/orderService";

function Orders() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await orderService.getOrders();
        const orderList = Array.isArray(response) ? response : response.orders || [];
        setOrders(orderList);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <main className="page simple-page">
        <div className="empty-state">
          <h1>Please log in</h1>
          <p>View your orders after signing in.</p>
          <button className="primary-button" onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      </main>
    );
  }

  return (
    <main className="page simple-page">
      <div className="section-heading">
        <p className="eyebrow">MY ORDERS</p>
        <h1>Recent Orders</h1>
      </div>

      {loading && <p className="status-message">Loading orders...</p>}
      {error && <p className="error-banner">{error}</p>}

      {!loading && orders.length === 0 && !error && (
        <div className="empty-state compact-state">
          <h2>No orders yet</h2>
          <p>Your completed purchases will appear here.</p>
          <button className="primary-button" onClick={() => navigate("/shop")}>Shop Collection</button>
        </div>
      )}

      <div className="orders-list">
        {orders.map((order) => (
          <button key={order.id} className="order-card" onClick={() => navigate(`/orders/${order.id}`)}>
            <div>
              <p className="order-label">Order #{order.id}</p>
              <p className="order-date">{new Date(order.created_at || order.createdAt).toLocaleDateString("en-IN")}</p>
            </div>
            <div>
              <p className="order-total">₹{Number(order.total_amount || order.totalAmount || 0).toLocaleString("en-IN")}</p>
              <p className="order-status">{order.status || "Placed"}</p>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}

export default Orders;
