import Register from "./components/auth/register";
import Login from "./components/auth/login";

const routes = [
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
];

export default routes;
