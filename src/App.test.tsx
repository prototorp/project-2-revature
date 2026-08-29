import { render, screen } from "@testing-library/react";
import {
  MemoryRouter,
} from "react-router-dom";
import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

vi.mock("./pages/LoginPage", () => ({
  default: () => <h1>Login page</h1>,
}));

vi.mock("./pages/MoviesPage", () => ({
  default: () => <h1>Movies page</h1>,
}));

vi.mock("./pages/MovieDetailsPage", () => ({
  default: () => <h1>Movie details page</h1>,
}));

function renderApp(initialRoute: string) {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe("App routing", () => {
  it("redirects the root route to login", async () => {
    renderApp("/");

    expect(
      await screen.findByRole("heading", {
        name: /login page/i,
      }),
    ).toBeInTheDocument();
  });

  it("redirects unauthenticated users away from movies", async () => {
    renderApp("/movies");

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

  it("allows authenticated users to view movies", async () => {
    localStorage.setItem(
      "isAuthenticated",
      "true",
    );

    renderApp("/movies");

    expect(
      await screen.findByRole("heading", {
        name: /movies page/i,
      }),
    ).toBeInTheDocument();
  });

  it("allows authenticated users to view movie details", async () => {
    localStorage.setItem(
      "isAuthenticated",
      "true",
    );

    renderApp("/movies/123");

    expect(
      await screen.findByRole("heading", {
        name: /movie details page/i,
      }),
    ).toBeInTheDocument();
  });

  it("displays the not-found page for an unknown route", async () => {
    renderApp("/invalid-route");

    expect(
      await screen.findByRole("heading", {
        name: /page not found/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /return to movies/i,
      }),
    ).toHaveAttribute("href", "/movies");
  });
});