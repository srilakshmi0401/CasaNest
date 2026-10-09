import { useEffect, useState } from "react";
import orderService from "../services/orderService";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await orderService.getOrders();
        const list = Array.isArray(response) ? response : response.orders || [];
        setOrders(list);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <main className="page simple-page admin-page">
      <div className="section-heading">
        <p className="eyebrow">ADMIN ORDERS</p>
        <h1>Order Management</h1>
      </div>

      {loading ? <p className="status-message">Loading orders...</p> : (
        <div className="orders-list admin-order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card admin-order-card">
              <div>
                <p className="order-label">Order #{order.id}</p>
                <p className="order-date">{new Date(order.created_at || order.createdAt).toLocaleDateString("en-IN")}</p>
              </div>
              <div>
                <p className="order-total">₹{Number(order.total_amount || order.totalAmount || 0).toLocaleString("en-IN")}</p>
                <p className="order-status">{order.status || "Placed"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default AdminOrders;
