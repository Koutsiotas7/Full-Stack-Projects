import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);

    if (requiredRole && decoded.role !== requiredRole) {
      return <Navigate to="/" />;
    }

    return children;

  } catch (err) {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;