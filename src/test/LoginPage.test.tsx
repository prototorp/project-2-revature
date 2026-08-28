import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
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