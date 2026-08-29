import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  MemoryRouter,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { describe, expect, it } from "vitest";

import ProtectedRoute from "../common/ProtectedRoute";
import { AuthProvider } from "../../context/AuthContext";
import Header from "./Header";

function TestLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function renderHeader(initialRoute = "/movies") {
  localStorage.setItem(
    "isAuthenticated",
    "true",
  );

  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={<h1>Login page</h1>}
          />

          <Route element={<ProtectedRoute />}>
            <Route element={<TestLayout />}>
              <Route
                path="/movies"
                element={<h1>Movies page</h1>}
              />

              <Route
                path="/movies/:movieId"
                element={<h1>Movie details page</h1>}
              />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe("Header", () => {
  it("displays the application navigation", () => {
    renderHeader();

    expect(
      screen.getByRole("link", {
        name: /moviedb/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /^movies$/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /^logout$/i,
      }),
    ).toBeInTheDocument();
  });

  it("navigates from movie details to the movies page", async () => {
    const user = userEvent.setup();

    renderHeader("/movies/123");

    expect(
      screen.getByRole("heading", {
        name: /movie details page/i,
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("link", {
        name: /^movies$/i,
      }),
    );

    expect(
      await screen.findByRole("heading", {
        name: /movies page/i,
      }),
    ).toBeInTheDocument();
  });

  it("logs out and redirects to the login page", async () => {
    const user = userEvent.setup();

    renderHeader();

    await user.click(
      screen.getByRole("button", {
        name: /^logout$/i,
      }),
    );

    expect(
      await screen.findByRole("heading", {
        name: /login page/i,
      }),
    ).toBeInTheDocument();

    expect(
      localStorage.getItem("isAuthenticated"),
    ).toBeNull();
  });
});