import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api'; // Import the authenticated axios instance

function MagazineForm() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [copies, setCopies] = useState(10);
    const [orderQty, setOrderQty] = useState(100);
    const [currentIssue, setCurrentIssue] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Date Formatting for Spring Boot LocalDateTime
        // HTML5 datetime-local returns "YYYY-MM-DDTHH:mm" (16 chars)
        // Our backend @JsonFormat expects "YYYY-MM-DDTHH:mm:ss"
        let formattedDate = currentIssue;
        if (formattedDate && formattedDate.length === 16) {
            formattedDate += ":00";
        }

        const newMagazine = {
            title,
            price: parseFloat(price),
            copies: parseInt(copies),
            orderQty: parseInt(orderQty),
            currentIssue: formattedDate
        };

        try {
            // 2. POST to the authenticated API
            await api.post('/magazines', newMagazine);

            alert("Magazine Saved Successfully!");

            // 3. Navigate back to the inventory list
            navigate('/inventory');
        } catch (err) {
            console.error("Save Error:", err.response?.data || err.message);
            alert("Failed to save magazine. Ensure you are logged in as an ADMIN.");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Add New Magazine</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label>Magazine Title:</label><br/>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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

                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                        <label>Copies:</label><br/>
                        <input
                            type="number"
                            value={copies}
                            onChange={(e) => setCopies(e.target.value)}
                            required
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label>Order Qty:</label><br/>
                        <input
                            type="number"
                            value={orderQty}
                            onChange={(e) => setOrderQty(e.target.value)}
                            required
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                <div>
                    <label>Issue Date & Time:</label><br/>
                    <input
                        type="datetime-local"
                        value={currentIssue}
                        onChange={(e) => setCurrentIssue(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>

                <button type="submit" style={{
                    backgroundColor: '#6f42c1', // Purple theme for magazines
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

export default MagazineForm;