import { Link } from "react-router-dom";
import { useCart } from "../context/cartcontext";

export default function Navbar() {
  const { getCartCount } = useCart();
  const count = getCartCount();
  return (
    <nav className="navbar">
      
      {/* LEFT: LOGO */}
      <div className="nav-left">
        <img
          src="/images/logo.png"
          alt="Sweet Crumbs"
          className="nav-logo"
        />
        <text className="nav-title">Sweet Crumbs</text>
      </div>

      {/* CENTER: LINKS */}
      <ul className="nav-center">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Shop</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      {/* RIGHT: ICONS */}
      <div className="nav-right">
        <Link to="/cart" className="cart-icon">
          🛒
          {count > 0 && <span className="cart-badge">{count}</span>}
        </Link>
        <a href="https://wa.me/918101608057">💬</a>
      </div>

    </nav>
  );
}

