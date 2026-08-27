import {
  NavLink,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Header() {
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

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

            <NavLink
              className={linkClass}
              to="/favorites"
            >
              Favorites
            </NavLink>

            <NavLink
              className={linkClass}
              to="/about"
            >
              About
            </NavLink>

            {isAuthenticated ? (
              <>
                <span className="navbar-text small">
                  {user?.email}
                </span>

                <button
                  className="btn btn-outline-light btn-sm"
                  type="button"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </>
            ) : (
              <NavLink
                className="btn btn-outline-light btn-sm"
                to="/login"
              >
                Log in
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;