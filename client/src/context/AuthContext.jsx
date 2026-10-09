/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("casanest-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("casanest-token") || "");

  useEffect(() => {
    if (user) {
      localStorage.setItem("casanest-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("casanest-user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("casanest-token", token);
    } else {
      localStorage.removeItem("casanest-token");
    }
  }, [token]);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setUser(response.user);
    setToken(response.token);
    return response;
  };

  const register = async (payload) => {
    const response = await authService.register(payload);
    return response;
  };

  const logout = () => {
    setUser(null);
    setToken("");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
