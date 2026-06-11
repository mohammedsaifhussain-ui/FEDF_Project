// ProtectedRoute.jsx
// If user is NOT logged in, redirect to /login
// This covers the "protected routes" rubric item

import { Navigate } from "react-router-dom";
import { useFit } from "../context/FitContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useFit();

  if (!isLoggedIn) {
    // Not logged in → send to login page
    return <Navigate to="/login" replace />;
  }

  // Logged in → show the actual page
  return children;
}
