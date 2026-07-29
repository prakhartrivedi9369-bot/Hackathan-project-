// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * The only hook components should use to read or act on auth state.
 * Throws loudly if used outside AuthProvider instead of silently
 * returning undefined — fails fast during development.
 */
export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}