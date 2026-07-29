// src/services/authService.js
import * as authStore from "../context/authStore";
import { isValidRole } from "../constants/roles";

/**
 * authService
 * -----------
 * The single API boundary for auth. AuthContext calls these functions and
 * never touches authStore or localStorage directly. Every function
 * returns a Promise on purpose: swapping the body for a real
 * `fetch("/api/auth/...")` call against the future Node/Express backend
 * will not require changing AuthContext, useAuth, or any component.
 *
 * Nothing here is wired into Login.jsx or Signup.jsx yet — that's the
 * next task. This is local-storage-only, no network calls.
 */

function toSession(token, user) {
  return { token, user };
}

export async function getSession() {
  const token = authStore.getToken();
  const user = authStore.getStoredUser();
  if (!token || !user) return null;
  return toSession(token, user);
}

export async function login({ email, password }) {
  // TODO(backend): replace body with POST /api/auth/login
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }
  const existing = authStore.getStoredUser();
  const token = "demo-token";
  const user =
    existing?.email === email ? existing : { name: email.split("@")[0], email, role: existing?.role ?? null };

  authStore.setToken(token);
  authStore.setStoredUser(user);
  return toSession(token, user);
}

export async function signup({ name, email, phone, role }) {
  // TODO(backend): replace body with POST /api/auth/signup
  if (!isValidRole(role)) {
    throw new Error(`Invalid role: ${role}`);
  }
  const token = "demo-token";
  const user = { name, email, phone, role };

  authStore.setToken(token);
  authStore.setStoredUser(user);
  return toSession(token, user);
}

export async function logout() {
  // TODO(backend): notify server to invalidate refresh token, if applicable
  authStore.clearAuthStorage();
}