import React from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";
import "./BookCard.css";

const BookCard = ({ book }) => {
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

  const handleRent = async () => {
    try {
      const response = await api.post(`/loans/rent/${book._id}`);
      alert(response.data.message);
      window.location.reload(); // quick refresh
    } catch (err) {
      alert(err.response?.data?.message || "Rent failed");
    }
  };

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Copies:</strong> {book.copies}</p>

      {/* Show Rent only for normal users */}
      {userRole === "user" && book.copies > 0 && (
        <button onClick={handleRent}>Rent</button>
      )}
    </div>
  );
};

export default BookCard;