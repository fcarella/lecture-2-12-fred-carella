import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../Home";
import BookList from "../BookList"; // Updated
import MagazineList from "../MagazineList"; // Updated
import BookForm from "../BookForm";
import MagazineForm from "../MagazineForm";
import Cart from "../Cart";
import Login from "../pages/Login";
import Logout from "../pages/Logout";

const Routes = () => {
    const { token } = useAuth();

    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                { path: "/", element: <Home /> },
                { path: "/books", element: <BookList /> }, // Updated path
                { path: "/magazines", element: <MagazineList /> }, // Updated path
                { path: "/cart", element: <Cart /> },
                { path: "/add", element: <BookForm /> },
                { path: "/add-magazine", element: <MagazineForm /> },
                { path: "/logout", element: <Logout /> },
            ],
        },
    ];

    const routesForNotAuthenticatedOnly = [{ path: "/login", element: <Login /> }];

    const router = createBrowserRouter([
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
        { path: "*", element: <Navigate to="/" /> }
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;