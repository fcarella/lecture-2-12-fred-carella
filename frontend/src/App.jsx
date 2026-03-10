import { useState, useEffect } from 'react'
import api from './api'; // Import our new interceptor-enabled api
import Book from './Book'
import Magazine from './Magazine'
import './App.css'

function App() {
    const [books, setBooks] = useState([]);
    const [magazines, setMagazines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = async () => {
        try {
            const [booksRes, magsRes] = await Promise.all([
                api.get('/books'),
                api.get('/magazines')
            ]);

            setBooks(booksRes.data);
            setMagazines(magsRes.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching inventory:", err);
            setLoading(false);
        }
    };

    const handleDeleteBook = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/books/${id}`);
            setBooks(books.filter(b => b.id !== id));
        } catch (err) {
            alert("Delete failed.");
        }
    };

    const handleUpdateBook = async (id, updatedData) => {
        try {
            const res = await api.put(`/books/${id}`, updatedData);
            setBooks(books.map(b => (b.id === id ? res.data : b)));
        } catch (err) {
            alert("Update failed.");
        }
    };

    const handleDeleteMagazine = async (id) => {
        if (!window.confirm("Delete?")) return;
        try {
            await api.delete(`/magazines/${id}`);
            setMagazines(magazines.filter(m => m.id !== id));
        } catch (err) {
            alert("Delete failed.");
        }
    };

    const handleUpdateMagazine = async (id, updatedData) => {
        try {
            const res = await api.put(`/magazines/${id}`, updatedData);
            setMagazines(magazines.map(m => (m.id === id ? res.data : m)));
        } catch (err) {
            alert("Update failed.");
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            await api.post(`/cart/add/${productId}`);
            alert("Added to cart!");
        } catch (err) {
            alert("Failed to add to cart.");
        }
    };

    if (loading) return <h2>Loading Store...</h2>;

    return (
        <div className="inventory-container">
            <section>
                <h1>Books</h1>
                {books.map(b => <Book key={b.id} {...b} onDelete={handleDeleteBook} onUpdate={handleUpdateBook} onAddToCart={handleAddToCart} />)}
            </section>
            <section>
                <h1>Magazines</h1>
                {magazines.map(m => <Magazine key={m.id} {...m} onDelete={handleDeleteMagazine} onUpdate={handleUpdateMagazine} onAddToCart={handleAddToCart} />)}
            </section>
        </div>
    );
}

export default App;