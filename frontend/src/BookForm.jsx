import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api'; // Import the authenticated axios instance

function BookForm() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [copies, setCopies] = useState(10);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBook = {
            title,
            author,
            price: parseFloat(price),
            copies: parseInt(copies)
        };

        try {
            // Use the centralized 'api' instance that has the JWT interceptor
            await api.post('/books', newBook);

            alert("Book Saved Successfully!");

            // Navigate back to the inventory list
            // Because App.jsx fetches on load, the new book will appear there
            navigate('/inventory');
        } catch (err) {
            console.error("Save Error:", err.response?.data || err.message);
            alert("Failed to save book. Check the console for details.");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label>Title:</label><br/>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>

                <div>
                    <label>Author:</label><br/>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>

                <div>
                    <label>Price:</label><br/>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>

                <div>
                    <label>Initial Copies:</label><br/>
                    <input
                        type="number"
                        value={copies}
                        onChange={(e) => setCopies(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>

                <button type="submit" style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Save to Database
                </button>

                <button type="button" onClick={() => navigate('/inventory')} style={{
                    backgroundColor: '#6c757d',
                    color: 'white',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default BookForm;