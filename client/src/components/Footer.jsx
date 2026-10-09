import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-brand">CASANEST</p>
          <p className="footer-copy">Curated home décor essentials for beautifully lived-in spaces.</p>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">About CasaNest</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/shop">Categories</Link></li>
          </ul>
        </div>

        <div>
          <h4>Support</h4>
          <ul>
            <li><Link to="/shop">Contact</Link></li>
            <li><Link to="/shop">Privacy Policy</Link></li>
            <li><Link to="/shop">Terms</Link></li>
          </ul>
        </div>

        <div>
          <h4>Follow</h4>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Pinterest</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
