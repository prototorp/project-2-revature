import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import { describe, expect, it } from "vitest";

import { AuthProvider } from "../../context/AuthContext";
import Header from "./Header";

function renderHeader(initialRoute = "/movies") {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>
        <Header />

        <Routes>
          <Route
            path="/movies"
            element={<h1>Movies page</h1>}
          />
          <Route
            path="/favorites"
            element={<h1>Favorites page</h1>}
          />
          <Route
            path="/about"
            element={<h1>About page</h1>}
          />
          <Route
            path="/login"
            element={<h1>Login page</h1>}
          />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe("Header navigation", () => {
  it("displays navigation links and login when logged out", () => {
    renderHeader();

    expect(
      screen.getByRole("link", {
        name: /^movies$/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /^favorites$/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /^about$/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /^log in$/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: /^log out$/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("navigates to another page when a link is selected", async () => {
    const user = userEvent.setup();

    renderHeader();

    await user.click(
      screen.getByRole("link", {
        name: /^about$/i,
      }),
    );

    expect(
      await screen.findByRole("heading", {
        name: /about page/i,
      }),
    ).toBeInTheDocument();
  });

  it("navigates to the favorites page", async () => {
    const user = userEvent.setup();

    renderHeader();

    await user.click(
      screen.getByRole("link", {
        name: /^favorites$/i,
      }),
    );

    expect(
      await screen.findByRole("heading", {
        name: /favorites page/i,
      }),
    ).toBeInTheDocument();
  });

  it("shows the current user and allows them to log out", async () => {
    localStorage.setItem(
      "movieAppUser",
      JSON.stringify({
        email: "test@example.com",
      }),
    );

    const user = userEvent.setup();

    renderHeader();

    expect(
      screen.getByText("test@example.com"),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("link", {
        name: /^log in$/i,
      }),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /^log out$/i,
      }),
    );

    expect(
      await screen.findByRole("heading", {
        name: /login page/i,
      }),
    ).toBeInTheDocument();

    expect(
      localStorage.getItem("movieAppUser"),
    ).toBeNull();
  });
});