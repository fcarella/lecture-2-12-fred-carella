// frontend/src/MagazineList.jsx
import { useState, useEffect } from 'react';
import api from './api';
import Magazine from './Magazine';

function MagazineList() {
    const [magazines, setMagazines] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadMagazines = async () => {
        try {
            const res = await api.get('/magazines');
            setMagazines(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error loading magazines", err);
            setLoading(false);
        }
    };

    useEffect(() => { loadMagazines(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this magazine?")) return;
        await api.delete(`/magazines/${id}`);
        setMagazines(magazines.filter(m => m.id !== id));
    };

    const handleUpdate = async (id, data) => {
        const res = await api.put(`/magazines/${id}`, data);
        setMagazines(magazines.map(m => (m.id === id ? res.data : m)));
    };

    const handleAddToCart = async (id) => {
        try {
            await api.post(`/cart/add/${id}`);
            alert("Magazine added to cart!");
        } catch (err) { alert("Error adding to cart"); }
    };

    if (loading) return <h2>Loading Magazines...</h2>;

    return (
        <div className="list-container">
            <h1>Magazine Catalog</h1>
            <div className="item-list">
                {magazines.map(m => (
                    <Magazine key={m.id} {...m} onDelete={handleDelete} onUpdate={handleUpdate} onAddToCart={handleAddToCart} />
                ))}
            </div>
        </div>
    );
}

export default MagazineList;