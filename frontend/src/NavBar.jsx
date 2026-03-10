import { Link } from 'react-router-dom';
import { useAuth } from './provider/authProvider';

function Navbar() {
    const { user } = useAuth();
    const isAdmin = user === 'admin';

    return (
        <nav style={{ padding: '1rem', backgroundColor: '#222', color: 'white', display: 'flex', gap: '20px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>🏠 Home</Link>
            <Link to="/books" style={{ color: 'white', textDecoration: 'none' }}>📚 Books</Link>
            <Link to="/magazines" style={{ color: 'white', textDecoration: 'none' }}>📰 Magazines</Link>
            <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>🛒 Cart</Link>

            {isAdmin && (
                <>
                    <Link to="/add" style={{ color: '#ffc107', textDecoration: 'none' }}>➕ Add Book</Link>
                    <Link to="/add-magazine" style={{ color: '#ffc107', textDecoration: 'none' }}>➕ Add Magazine</Link>
                </>
            )}

            <div style={{ marginLeft: 'auto' }}>
                <span style={{ marginRight: '10px' }}>User: {user}</span>
                <Link to="/logout" style={{ color: '#ff4444' }}>Logout</Link>
            </div>
        </nav>
    );
}

export default Navbar;