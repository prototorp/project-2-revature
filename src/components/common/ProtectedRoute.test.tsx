import { render, screen } from "@testing-library/react";
import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import { describe, expect, it } from "vitest";

import { AuthProvider } from "../../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function renderProtectedRoute(initialRoute = "/movies") {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={<h1>Login page</h1>}
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

describe("ProtectedRoute", () => {
  it("redirects unauthenticated users to login", async () => {
    renderProtectedRoute();

    expect(
      await screen.findByRole("heading", {
        name: /login page/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /movies page/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("allows authenticated users to view the movies page", async () => {
    localStorage.setItem(
      "isAuthenticated",
      "true",
    );

    renderProtectedRoute();

    expect(
      await screen.findByRole("heading", {
        name: /movies page/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /login page/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("allows authenticated users to view movie details", async () => {
    localStorage.setItem(
      "isAuthenticated",
      "true",
    );

    renderProtectedRoute("/movies/123");

    expect(
      await screen.findByRole("heading", {
        name: /movie details page/i,
      }),
    ).toBeInTheDocument();
  });
});