import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navLinkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
          CASANEST
        </Link>
        <button className="mobile-menu-toggle" onClick={() => setIsOpen((current) => !current)} aria-label="Toggle menu">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/shop" className={navLinkClass} onClick={() => setIsOpen(false)}>Shop</NavLink>
          <NavLink to="/wishlist" className={navLinkClass} onClick={() => setIsOpen(false)}>
            Wishlist {wishlistCount > 0 ? <span className="nav-count">{wishlistCount}</span> : ""}
          </NavLink>
          <NavLink to="/cart" className={navLinkClass} onClick={() => setIsOpen(false)}>
            Cart <span className="nav-count">{cartCount}</span>
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/admin" className={navLinkClass} onClick={() => setIsOpen(false)}>Admin</NavLink>
          )}
          {user ? (
            <>
              <span className="nav-user">Hi, {user.name.split(" ")[0]}</span>
              <button className="nav-logout" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass} onClick={() => setIsOpen(false)}>Login</NavLink>
              <NavLink to="/register" className={navLinkClass} onClick={() => setIsOpen(false)}>Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
export default Navbar;