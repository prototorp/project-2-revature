import { useState, type SyntheticEvent } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface LoginLocationState {
  from?:
    | string
    | {
        pathname?: string;
      };
}

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const locationState =
    location.state as LoginLocationState | null;

  const attemptedRoute = locationState?.from;

  const redirectPath =
    typeof attemptedRoute === "string"
      ? attemptedRoute
      : attemptedRoute?.pathname ?? "/movies";

  if (isAuthenticated) {
    return (
      <Navigate
        to={redirectPath}
        replace
      />
    );
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    setError("");

    login();

    navigate(redirectPath, {
      replace: true,
      state: {
        message: "Login successful! Welcome!",
      },
    });
  }

  return (
    <section className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div
        className="card shadow-lg border-0 rounded-4"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <div className="card-body p-5">
          <h1 className="text-center fw-bold mb-2">
            🎬 MovieDB
          </h1>

          <p className="text-center text-muted mb-4">
            Sign in to continue
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>

              <input
                id="username"
                type="text"
                className="form-control form-control-lg"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                placeholder="Enter username"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>

              <input
                id="password"
                type="password"
                className="form-control form-control-lg"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter password"
              />
            </div>

            {error && (
              <p className="text-danger text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 mt-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;