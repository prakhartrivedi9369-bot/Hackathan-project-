import { Navigate, useLocation } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

/**
 * Wraps any route that requires an authenticated user, and renders the
 * shared dashboard shell (sidebar + topbar) around it.
 *
 * Auth is currently a demo token in localStorage — swap the check below
 * for a real auth context / API call once a backend exists. Nothing else
 * in the app needs to change: every page still just returns its content.
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("guardianmesh_token");

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
