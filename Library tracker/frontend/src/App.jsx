import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBook from "./pages/AddBook";
import MyLoans from "./pages/MyLoans";
import AdminLoans from "./pages/AdminLoans";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/my-loans"
          element={
            <ProtectedRoute>
              <MyLoans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-book"
          element={
            <ProtectedRoute requiredRole="admin">
              <AddBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-loans"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLoans />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;