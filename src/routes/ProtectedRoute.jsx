// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import useAuth from "../hooks/useAuth";

/**
 * Wraps any route that requires an authenticated user (and optionally a
 * specific role), rendering the shared dashboard shell around it.
 *
 * Auth state comes from AuthContext via useAuth() — this file doesn't
 * know or care how a session is stored.
 *
 * allowedRoles is optional and unused until role-specific dashboards
 * exist; pass e.g. allowedRoles={[ROLES.GOVERNMENT]} on a route later
 * without touching this file again.
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return null; // swap for a shared loading spinner if/when one exists
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}