import {
  render,
  screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";

import {
  describe,
  expect,
  it,
} from "vitest";

import ProtectedRoute from "../components/common/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import LoginPage from "./LoginPage";

function renderLogin(
  initialRoute: string = "/login",
) {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/movies"
            element={<h1>Movies page</h1>}
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

describe("LoginPage", () => {
  it("displays validation errors for invalid input", async () => {
    const user = userEvent.setup();

    renderLogin();

    await user.type(
      screen.getByLabelText(/email/i),
      "invalid-email",
    );

    await user.type(
      screen.getByLabelText(/password/i),
      "123",
    );

    await user.click(
      screen.getByRole("button", {
        name: /log in/i,
      }),
    );

    expect(
      screen.getByText(
        "Enter a valid email address.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Password must contain at least 6 characters.",
      ),
    ).toBeInTheDocument();

    expect(
      localStorage.getItem("movieAppUser"),
    ).toBeNull();
  });

  it("logs in with valid input and stores the user", async () => {
    const user = userEvent.setup();

    renderLogin();

    await user.type(
      screen.getByLabelText(/email/i),
      "test@example.com",
    );

    await user.type(
      screen.getByLabelText(/password/i),
      "password",
    );

    await user.click(
      screen.getByRole("button", {
        name: /log in/i,
      }),
    );

    expect(
      await screen.findByRole("heading", {
        name: /movies page/i,
      }),
    ).toBeInTheDocument();

    const storedUser = JSON.parse(
      localStorage.getItem("movieAppUser") ??
        "null",
    );

    expect(storedUser).toEqual({
      email: "test@example.com",
    });
  });

  it("returns the user to a protected page after login", async () => {
    const user = userEvent.setup();

    renderLogin("/favorites");

    expect(
      await screen.findByRole("heading", {
        name: /log in/i,
      }),
    ).toBeInTheDocument();

    await user.type(
      screen.getByLabelText(/email/i),
      "test@example.com",
    );

    await user.type(
      screen.getByLabelText(/password/i),
      "password",
    );

    await user.click(
      screen.getByRole("button", {
        name: /log in/i,
      }),
    );

    expect(
      await screen.findByRole("heading", {
        name: /favorites page/i,
      }),
    ).toBeInTheDocument();
  });
});