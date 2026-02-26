import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let userRole = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
    } catch (err) {
      console.error("Invalid token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        My Library Tracker
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
      {userRole === "user" && (
        <Link to="/my-loans">My Loans</Link>
      )}
        {/* Admin Only */}
        {userRole === "admin" && (
          <>
            <Link to="/add-book">Add Book</Link>
            <Link to="/admin-loans" className="admin-loans-link">Loans</Link>
          </>
        )}

        {!token ? (
          <>
            <Link to="/login" className="login-link">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;