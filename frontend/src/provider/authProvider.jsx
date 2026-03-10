import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Initialize state from localStorage
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const [user, setUser_] = useState(localStorage.getItem("user"));

    const setToken = (newToken) => {
        setToken_(newToken);
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
    };

    const setUser = (newUser) => {
        setUser_(newUser);
        if (newUser) {
            localStorage.setItem('user', newUser);
        } else {
            localStorage.removeItem('user');
        }
    };

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            user,
            setUser
        }),
        [token, user]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;