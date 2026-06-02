import { createBrowserRouter } from "react-router-dom";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductList from "./components/ProductList";

const router = createBrowserRouter([
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/products', element: <ProtectedRoute><ProductList /></ProtectedRoute> },
]);

export default router;
