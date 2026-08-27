import { useState, type FormEvent } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface FormErrors {
  email?: string;
  password?: string;
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath =
    (
      location.state as {
        from?: {
          pathname?: string;
        };
      } | null
    )?.from?.pathname ?? "/movies";

  if (isAuthenticated) {
    return <Navigate to="/movies" replace />;
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    const trimmedEmail = email.trim();

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      nextErrors.email =
        "Enter a valid email address.";
    }

    if (password.length < 6) {
      nextErrors.password =
        "Password must contain at least 6 characters.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    login(trimmedEmail);

    navigate(redirectPath, {
      replace: true,
    });
  }

  return (
    <section className="container py-5">
      <div className="card mx-auto login-card">
        <div className="card-body p-4">
          <h1 className="h2 mb-3">Log in</h1>

          <p className="text-body-secondary mb-4">
            Use any valid email and a password with
            at least six characters.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3 text-start">
              <label
                className="form-label"
                htmlFor="email"
              >
                Email
              </label>

              <input
                className={
                  `form-control${
                    errors.email ? " is-invalid" : ""
                  }`
                }
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
              />

              {errors.email && (
                <div className="invalid-feedback">
                  {errors.email}
                </div>
              )}
            </div>

            <div className="mb-4 text-start">
              <label
                className="form-label"
                htmlFor="password"
              >
                Password
              </label>

              <input
                className={
                  `form-control${
                    errors.password
                      ? " is-invalid"
                      : ""
                  }`
                }
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
              />

              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password}
                </div>
              )}
            </div>

            <button
              className="btn btn-primary w-100"
              type="submit"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;