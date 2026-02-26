import { useState, useEffect } from "react";
import api from "../api/axios";
import BookCard from "../components/BookCard";

function Home() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get(
          "/books"
        );

        setBooks(response.data.books);

      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1 style={{color: "red"}}>Full Stack Library Tracker</h1>

      {books.length === 0 ? (
        <p>No books stored!</p>
      ) : (
        books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))
      )}
    </div>
  );
}

export default Home;