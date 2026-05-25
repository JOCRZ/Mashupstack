import { createBrowserRouter } from "react-router-dom";
import Aboutus from "./Aboutus";
import App from "../App";
import StudentProfile from "./StudentProfile";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'aboutus', element: <Aboutus/> },
    { path: 'student/:name', element: <StudentProfile/> },
]);

export default router;
