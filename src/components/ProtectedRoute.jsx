import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  // If there’s no token, redirect to /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise render the requested component
  return children;
}
