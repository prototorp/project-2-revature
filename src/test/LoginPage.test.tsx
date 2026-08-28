import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "@jest/globals";
import { MemoryRouter, Route,
  Routes, } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";


import ProtectedRoute from "../components/common/ProtectedRoute";
import Header from "../components/layout/Header";

import LoginPage from "../pages/LoginPage";




/* =================     Login page renders==================== */
beforeEach(() => {
  localStorage.clear();
});

test("renders the login page", () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>,
  );

  expect(screen.getByLabelText("Username")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Login" }),
  ).toBeInTheDocument();
});



/* ========================= login validation  ============================ */

import userEvent from "@testing-library/user-event";

test("shows an error when username and password are empty", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>,
  );

  await user.click(
    screen.getByRole("button", { name: "Login" }),
  );

  expect(
    screen.getByText("Username and password are required."),
  ).toBeInTheDocument();
});



/* ========================= Test successful login. 
 connects your LoginPage to your AuthContext. ============================ */
    

test("logs the user in successfully", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>,
  );

  await user.type(
    screen.getByLabelText("Username"),
    "bassem",
  );

  await user.type(
    screen.getByLabelText("Password"),
    "123456",
  );

  await user.click(
    screen.getByRole("button", { name: "Login" }),
  );

  expect(localStorage.getItem("isAuthenticated")).toBe("true");
});




// =================Successful login saves authentication state=============

test("logs the user in successfully", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>,
  );

  await user.type(
    screen.getByLabelText("Username"),
    "bassem",
  );

  await user.type(
    screen.getByLabelText("Password"),
    "123456",
  );

  await user.click(
    screen.getByRole("button", { name: "Login" }),
  );

  expect(
    localStorage.getItem("isAuthenticated"),
  ).toBe("true");
});

// ==================== ProtectedRoute redirects unauthenticated users==============


test("redirects unauthenticated users to login", () => {
  render(
    <MemoryRouter initialEntries={["/movies"]}>
      <AuthProvider>
        <Routes>
          <Route
            path="/movies"
            element={<ProtectedRoute />}
          >
            <Route
              index
              element={<div>Protected Content</div>}
            />
          </Route>

          <Route
            path="/login"
            element={<div>Login Page</div>}
          />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  );

  expect(
    screen.getByText("Login Page"),
  ).toBeInTheDocument();

  expect(
    screen.queryByText("Protected Content"),
  ).not.toBeInTheDocument();
});

// ============== ProtectedRoute allows authenticated users==============


test("allows authenticated users to access protected content", () => {
  localStorage.setItem("isAuthenticated", "true");

  render(
    <MemoryRouter initialEntries={["/movies"]}>
      <AuthProvider>
        <Routes>
          <Route
            path="/movies"
            element={<ProtectedRoute />}
          >
            <Route
              index
              element={<div>Protected Content</div>}
            />
          </Route>

          <Route
            path="/login"
            element={<div>Login Page</div>}
          />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  );

  expect(
    screen.getByText("Protected Content"),
  ).toBeInTheDocument();

  expect(
    screen.queryByText("Login Page"),
  ).not.toBeInTheDocument();
});

// ==========Header logout clears authentication=================


test("logs the user out", async () => {
  localStorage.setItem("isAuthenticated", "true");

  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </MemoryRouter>,
  );

  await user.click(
    screen.getByRole("button", { name: "Logout" }),
  );

  expect(
    localStorage.getItem("isAuthenticated"),
  ).toBeNull();
});