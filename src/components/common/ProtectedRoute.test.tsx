import { render, screen } from "@testing-library/react";
import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import { describe, expect, it } from "vitest";

import { AuthProvider } from "../../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function renderProtectedRoute() {
  render(
    <MemoryRouter initialEntries={["/favorites"]}>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={<h1>Login page</h1>}
          />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/favorites"
              element={<h1>Favorites page</h1>}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe("ProtectedRoute", () => {
  it("redirects unauthenticated users to the login page", async () => {
    renderProtectedRoute();

    expect(
      await screen.findByRole("heading", {
        name: /login page/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /favorites page/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("renders the protected page for authenticated users", async () => {
    localStorage.setItem(
      "movieAppUser",
      JSON.stringify({
        email: "test@example.com",
      }),
    );

    renderProtectedRoute();

    expect(
      await screen.findByRole("heading", {
        name: /favorites page/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /login page/i,
      }),
    ).not.toBeInTheDocument();
  });
});