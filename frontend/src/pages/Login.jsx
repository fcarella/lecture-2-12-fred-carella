import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import api from "../api";

const Login = () => {
    const { setToken, setUser } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", { email, password });
            setToken(response.data.token);
            setUser(response.data.email);
            navigate("/", { replace: true });
        } catch (err) {
            alert("Invalid username or password.");
        }
    };

    return (
        <div style={{ padding: "50px", textAlign: "center" }}>
            <h1>Sign In</h1>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} /><br/><br/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/><br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;