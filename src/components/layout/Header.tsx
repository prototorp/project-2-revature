import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { logout } = useAuth();
  return (
    <header>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/movies">
            <i className="bi bi-film me-2"></i>
            MovieDB
          </NavLink>

          <div className="navbar-nav flex-row gap-3">
            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>

            {/* Add these after the pages are implemented. */}
            {/* <NavLink className="nav-link" to="/favorites">
              Favorites
            </NavLink>

            <NavLink className="nav-link" to="/about">
              About
            </NavLink> */}

            <button className="btn btn-outline-light btn-sm" onClick={logout}>
              Logout
            </button>
            
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
