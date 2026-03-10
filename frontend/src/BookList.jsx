// frontend/src/BookList.jsx
import { useState, useEffect } from 'react';
import api from './api';
import Book from './Book';

function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadBooks = async () => {
        try {
            const res = await api.get('/books');
            setBooks(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error loading books", err);
            setLoading(false);
        }
    };

    useEffect(() => { loadBooks(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this book?")) return;
        await api.delete(`/books/${id}`);
        setBooks(books.filter(b => b.id !== id));
    };

    const handleUpdate = async (id, data) => {
        const res = await api.put(`/books/${id}`, data);
        setBooks(books.map(b => (b.id === id ? res.data : b)));
    };

    const handleAddToCart = async (id) => {
        try {
            await api.post(`/cart/add/${id}`);
            alert("Book added to cart!");
        } catch (err) { alert("Error adding to cart"); }
    };

    if (loading) return <h2>Loading Books...</h2>;

    return (
        <div className="list-container">
            <h1>Book Catalog</h1>
            <div className="item-list">
                {books.map(b => (
                    <Book key={b.id} {...b} onDelete={handleDelete} onUpdate={handleUpdate} onAddToCart={handleAddToCart} />
                ))}
            </div>
        </div>
    );
}

export default BookList;