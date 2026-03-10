import { useNavigate } from "react-router-dom";

import { useAuth } from "../provider/authProvider";

import { useEffect } from "react";

const Logout = () => {

    const { setToken } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {

        // Clearing the token automatically removes the Axios header and localStorage

        setToken(null);

        navigate("/", { replace: true });

    }, [navigate, setToken]);

    return <>Logging out...</>;

};

export default Logout;
