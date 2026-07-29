// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Incidents from "../pages/Incidents";
import IncidentDetail from "../pages/IncidentDetail";
import Teams from "../pages/Teams";
import Resources from "../pages/Resources";
import Reports from "../pages/Reports";
import AllInsights from "../pages/AIInsights";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/incidents" element={<ProtectedRoute><Incidents /></ProtectedRoute>} />
      <Route path="/incidents/:id" element={<ProtectedRoute><IncidentDetail /></ProtectedRoute>} />
      <Route path="/teams" element={<ProtectedRoute><Teams /></ProtectedRoute>} />
      <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="/insights" element={<ProtectedRoute><AllInsights /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}