import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/">Classwork App</NavLink>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink
                            to="/register"
                            className={({ isActive }) =>
                                'nav-link ' + (isActive ? 'active' : '')
                            }
                        >
                            Register
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
