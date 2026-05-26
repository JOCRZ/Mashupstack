import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="nav">
      <NavLink end to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/about" className="nav-link">
        About
      </NavLink>
      <NavLink to="/contact" className="nav-link">
        Contact
      </NavLink>
    </nav>
  );
}

export default Navbar;
