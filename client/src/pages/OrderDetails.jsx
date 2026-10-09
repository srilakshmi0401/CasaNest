import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import orderService from "../services/orderService";

function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderService.getOrderById(id);
        setOrder(response.order || response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <main className="page simple-page"><p className="status-message">Loading order details...</p></main>;
  }

  if (!order) {
    return (
      <main className="page simple-page">
        <div className="empty-state">
          <h1>Order not found</h1>
          <button className="primary-button" onClick={() => navigate("/orders")}>Back to Orders</button>
        </div>
      </main>
    );
  }

  return (
    <main className="page simple-page">
      <div className="section-heading">
        <p className="eyebrow">ORDER DETAILS</p>
        <h1>Order #{order.id}</h1>
      </div>

      <div className="order-detail-card">
        <div className="detail-row">
          <span>Date</span>
          <strong>{new Date(order.created_at || order.createdAt || Date.now()).toLocaleDateString("en-IN")}</strong>
        </div>
        <div className="detail-row">
          <span>Status</span>
          <strong>{order.status || "Placed"}</strong>
        </div>
        <div className="detail-row">
          <span>Total</span>
          <strong>₹{Number(order.total_amount || order.totalAmount || 0).toLocaleString("en-IN")}</strong>
        </div>

        <div className="detail-separator" />

        {(order.items || []).map((item) => (
          <div className="order-item-detail" key={item.id || `${order.id}-${item.product_id}`}>
            <div>
              <p className="order-label">Product #{item.product_id}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <strong>₹{Number(item.price || 0).toLocaleString("en-IN")}</strong>
          </div>
        ))}
      </div>
    </main>
  );
}

export default OrderDetails;
