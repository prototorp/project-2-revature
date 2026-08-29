import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import { describe, expect, it } from "vitest";

import ProtectedRoute from "../components/common/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import LoginPage from "./LoginPage";

function renderLogin(initialRoute = "/login") {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/movies"
              element={<h1>Movies page</h1>}
            />

            <Route
              path="/movies/:movieId"
              element={<h1>Movie details page</h1>}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe("LoginPage", () => {
  it("shows an error when the form is empty", async () => {
    const user = userEvent.setup();

    renderLogin();

    await user.click(
      screen.getByRole("button", {
        name: /^login$/i,
      }),
    );

    expect(
      screen.getByText(
        /username and password are required/i,
      ),
    ).toBeInTheDocument();

    expect(
      localStorage.getItem("isAuthenticated"),
    ).toBeNull();
  });

  it("logs in and saves authentication state", async () => {
    const user = userEvent.setup();

    renderLogin();

    await user.type(
      screen.getByLabelText(/username/i),
      "test-user",
    );

    await user.type(
      screen.getByLabelText(/password/i),
      "password",
    );

    await user.click(
      screen.getByRole("button", {
        name: /^login$/i,
      }),
    );

    expect(
      await screen.findByRole("heading", {
        name: /movies page/i,
      }),
    ).toBeInTheDocument();

    expect(
      localStorage.getItem("isAuthenticated"),
    ).toBe("true");
  });

  it("returns the user to a protected movie route after login", async () => {
    const user = userEvent.setup();

    renderLogin("/movies/123");

    expect(
      await screen.findByRole("heading", {
        name: /moviedb/i,
      }),
    ).toBeInTheDocument();

    await user.type(
      screen.getByLabelText(/username/i),
      "test-user",
    );

    await user.type(
      screen.getByLabelText(/password/i),
      "password",
    );

    await user.click(
      screen.getByRole("button", {
        name: /^login$/i,
      }),
    );

    expect(
      await screen.findByRole("heading", {
        name: /movie details page/i,
      }),
    ).toBeInTheDocument();
  });
});