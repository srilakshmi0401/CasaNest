import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productService from "../services/productService";
import orderService from "../services/orderService";

function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productResponse, orderResponse] = await Promise.all([
          productService.getProducts(),
          orderService.getOrders(),
        ]);

        const productList = Array.isArray(productResponse) ? productResponse : productResponse.products || [];
        const orderList = Array.isArray(orderResponse) ? orderResponse : orderResponse.orders || [];

        setProducts(productList);
        setOrders(orderList);
      } catch (error) {
        console.error("Error loading admin data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalSales = orders.reduce((sum, order) => sum + Number(order.total_amount || order.totalAmount || 0), 0);

  return (
    <main className="page simple-page admin-page">
      <div className="section-heading">
        <p className="eyebrow">ADMIN PANEL</p>
        <h1>Dashboard</h1>
      </div>

      {loading ? <p className="status-message">Loading dashboard...</p> : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <span>Total Products</span>
              <strong>{products.length}</strong>
            </div>
            <div className="stat-card">
              <span>Total Orders</span>
              <strong>{orders.length}</strong>
            </div>
            <div className="stat-card">
              <span>Total Users</span>
              <strong>12</strong>
            </div>
            <div className="stat-card sales-card">
              <span>Total Sales</span>
              <strong>₹{totalSales.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <div className="admin-links">
            <Link to="/admin/products" className="primary-button">Manage Products</Link>
            <Link to="/admin/orders" className="secondary-button">View Orders</Link>
          </div>
        </>
      )}
    </main>
  );
}

export default Admin;
