import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from './api'; // Import the authenticated axios instance

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Load the cart from the backend
    const loadCart = async () => {
        try {
            const res = await api.get('/cart');
            setCart(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error loading cart:", err);
            setLoading(false);
        }
    };

    // Load on mount
    useEffect(() => {
        loadCart();
    }, []);

    // 2. Remove an item using our CartRestController
    const handleRemove = async (productId) => {
        try {
            await api.delete(`/cart/remove/${productId}`);
            // Refresh the cart data after removal
            loadCart();
        } catch (err) {
            alert("Failed to remove item.");
        }
    };

    if (loading) return <p>Loading your shopping cart...</p>;
    if (!cart) return <p>Could not load cart. Please try again later.</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Your Shopping Cart</h1>

            {cart.products.length === 0 ? (
                <div>
                    <p>Your cart is currently empty.</p>
                    <Link to="/inventory" style={{ color: '#007bff' }}>Go browsing for books!</Link>
                </div>
            ) : (
                <div className="cart-content">
                    <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ padding: '10px' }}>Item Name / Description</th>
                            <th style={{ padding: '10px' }}>Type</th>
                            <th style={{ padding: '10px' }}>Price</th>
                            <th style={{ padding: '10px' }}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cart.products.map((product) => (
                            <tr key={product.id}>
                                <td style={{ padding: '10px' }}>
                                    {/* Handle Publication titles or Ticket descriptions */}
                                    {product.title || product.description}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    {product.productType}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    ${Number(product.price).toFixed(2)}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    <button
                                        onClick={() => handleRemove(product.id)}
                                        style={{
                                            backgroundColor: '#ff4444',
                                            color: 'white',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <h3>
                            Total: $
                            {cart.products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                        </h3>
                        <button style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            padding: '10px 20px',
                            fontSize: '1rem',
                            border: 'none',
                            borderRadius: '4px'
                        }}>
                            Checkout (Simulated)
                        </button>
                    </div>
                </div>
            )}

            <br />
            <Link to="/inventory">Back to Store</Link>
        </div>
    );
}

export default Cart;