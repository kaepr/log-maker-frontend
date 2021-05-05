import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { user } from "../../store/store";

const Navbar = () => {
  const [userData, setUserData] = useAtom(user);

  let isLogged = false;
  let isAdmin = false;
  if (userData !== null && userData !== undefined) {
    isLogged = true;
    if (userData.role === "ADMIN") {
      isAdmin = true;
    }
  }

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
        {isLogged && (
          <li className="navbar--item">
            <Link to="/logs" className="navbar--link">
              Logs
            </Link>
          </li>
        )}
        {isAdmin && (
          <li className="navbar--item">
            <Link to="/admin" className="navbar--link">
              Admin
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
