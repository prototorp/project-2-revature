import { createContext, useState, type ReactNode } from "react";

const STORAGE_KEY = "movieAppUser";

export interface AuthUser {
  email: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<
  AuthContextValue | undefined
>(undefined);

function readStoredUser(): AuthUser | null {
  const storedUser = localStorage.getItem(STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    const parsedUser: unknown = JSON.parse(storedUser);

    if (
      typeof parsedUser === "object" &&
      parsedUser !== null &&
      "email" in parsedUser &&
      typeof parsedUser.email === "string"
    ) {
      return {
        email: parsedUser.email,
      };
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  return null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(
    readStoredUser,
  );

  function login(email: string) {
    const authenticatedUser = {
      email,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(authenticatedUser),
    );

    setUser(authenticatedUser);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}