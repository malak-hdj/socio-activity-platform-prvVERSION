import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const roles = user.roles || [];

  if (roles.includes("ADMIN_SYSTEME")) {
    return children;
  }

  if (allowedRoles && !allowedRoles.some((role) => roles.includes(role))) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}