// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Whenever token changes, persist it and (re)load the user
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      // Fetch the user's profile
      api
        .get("/user/me")
        .then((res) => setUser(res.data.data))
        .catch(() => {
          // invalid token? clear it
          setUser(null);
          setToken(null);
        });
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const login = ({ userData, jwt }) => {
    // Immediately set both; the effect will re-fetch if needed
    setUser(userData);
    setToken(jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
