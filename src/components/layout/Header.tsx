import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { logout } = useAuth();

  const linkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <header>
      <nav className="navbar navbar-dark bg-dark py-3">
        <div className="container d-flex flex-wrap gap-3">
          <NavLink
            className="navbar-brand"
            to="/movies"
          >
            <i className="bi bi-film me-2"></i>
            MovieDB
          </NavLink>

          <div className="navbar-nav flex-row flex-wrap align-items-center gap-3 ms-auto">
            <NavLink
              className={linkClass}
              to="/movies"
            >
              Movies
            </NavLink>

            <button
              className="btn btn-outline-light btn-sm"
              type="button"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;