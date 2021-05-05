import { Link, Redirect } from "react-router-dom";
import { useAtom } from "jotai";
import { user } from "../../store/store";

const Navbar = (props) => {
  const [userData, setUserData] = useAtom(user);

  let isLogged = false;
  let isAdmin = false;
  if (userData !== null && userData !== undefined) {
    isLogged = true;
    if (userData.role === "ADMIN") {
      isAdmin = true;
    }
  }

  const handleLogout = () => {
    try {
      setUserData(null);
      localStorage.removeItem("token");
      // props.history.push("/");
      return <Redirect to="/" />;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar--list">
        <li className="navbar--item">
          <Link to="/" className="navbar--link">
            Home
          </Link>
        </li>
        {!isLogged && (
          <li className="navbar--item">
            <Link to="/login" className="navbar--link">
              Login
            </Link>
          </li>
        )}
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
        {isLogged && (
          <li className="navbar--item" onClick={handleLogout}>
            <p className="navbar--link">Logout</p>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
