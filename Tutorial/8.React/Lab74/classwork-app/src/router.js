import { createBrowserRouter } from "react-router-dom";
import Register from "./components/auth/register";
import Login from "./components/auth/login";

const router = createBrowserRouter([
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
]);

export default router;
