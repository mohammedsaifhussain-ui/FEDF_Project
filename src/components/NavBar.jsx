import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFit } from "../context/FitContext";
import "./NavBar.css";

export default function NavBar() {
  const { isLoggedIn, logout, queueCount } = useFit();
  const navigate  = useNavigate();
  const location  = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__logo">FF</span>
        <span className="navbar__name">FitFlow</span>
      </Link>

      <ul className="navbar__links">
        <li><Link to="/"       className={`navbar__link ${isActive("/") ? "navbar__link--active" : ""}`}>Home</Link></li>
        <li><Link to="/browse" className={`navbar__link ${isActive("/browse") ? "navbar__link--active" : ""}`}>Browse</Link></li>
        {isLoggedIn && (
          <li>
            <Link to="/session" className={`navbar__link ${isActive("/session") ? "navbar__link--active" : ""}`}>
              Session {queueCount > 0 && <span className="navbar__badge">{queueCount}</span>}
            </Link>
          </li>
        )}
      </ul>

      <div className="navbar__auth">
        {isLoggedIn ? (
          <button className="btn btn--ghost navbar__logout" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login" className="btn btn--primary">Login</Link>
        )}
      </div>
    </nav>
  );
}
