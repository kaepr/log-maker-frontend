import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar--list">
        <li className="navbar--item">
          <Link to="/" className="navbar--link">
            Home
          </Link>
        </li>
        <li className="navbar--item">
          <Link to="/login" className="navbar--link">
            Login
          </Link>
        </li>
        <li className="navbar--item">
          <Link to="/logs " className="navbar--link">
            Logs
          </Link>
        </li>
        <li className="navbar--item">
          <Link to="/admin" className="navbar--link">
            Admin
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
