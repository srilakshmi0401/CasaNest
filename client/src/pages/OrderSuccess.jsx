import { Link, useSearchParams } from "react-router-dom";

function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "CASA-000";
  const total = searchParams.get("total") || "0";

  return (
    <main className="page simple-page">
      <div className="success-card">
        <p className="eyebrow">ORDER CONFIRMED</p>
        <h1>Order placed successfully</h1>
        <p className="success-text">Your order ID is <strong>#{orderId}</strong></p>
        <p className="success-text">Total amount: <strong>₹{Number(total).toLocaleString("en-IN")}</strong></p>

        <div className="cta-row">
          <Link to="/shop" className="primary-button">Continue Shopping</Link>
          <Link to="/orders" className="secondary-button">View My Orders</Link>
        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;
