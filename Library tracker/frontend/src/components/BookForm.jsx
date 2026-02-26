import React, { useState } from "react";
import api from '../api/axios';
import './BookCard.css';

function BookForm({ onBookAdded}) {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copies, setCopies] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
            const response = await api.post('/books',
                {title, author, isbn, copies: Number(copies)}
            );

            setTitle('');
            setAuthor('');
            setIsbn('');
            setCopies('');

        } catch(err) {
            console.error('Error adding new book: ', err);
            setError(err.response?.data?.message || 'Could not add the book!'); //optional chaining. If the previous property exists, we access the next one.
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
        <form className="book-form" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />

            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                />

            <input
                type="text"
                placeholder="ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                required
                />

            <input
                type="number"
                placeholder="Copies"
                value={copies}
                onChange={(e) => setCopies(e.target.value)}
                min={1}
                required
                />

            <button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Book'}
            </button>
        </form>
        </>
    );
}

export default BookForm;