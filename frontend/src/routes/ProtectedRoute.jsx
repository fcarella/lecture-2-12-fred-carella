import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import Navbar from "../NavBar"; // Import your Navbar here
export const ProtectedRoute = () => {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to="/login" />;
    }
    // Wrap the Outlet in a layout div with the Navbar
    return (
        <div className="app-container">
            <Navbar />
            <main style={{ padding: "20px" }}>
                <Outlet /> {/* This is where Home, Inventory, etc. will render */}
            </main>
        </div>
    );
};
