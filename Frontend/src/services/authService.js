// src/services/authService.js
import * as authStore from "../context/authStore";
import { isValidRole } from "../constants/roles";

/**
 * authService — the abstraction boundary for authentication.
 * AuthContext talks to auth exclusively through these functions; it never
 * touches authStore or a network directly.
 *
 * login/signup below are LOCAL/OFFLINE implementations only — there is no
 * backend yet, so there is no real credential verification, password
 * hashing, or token signing happening here. This lets the full flow
 * (Login/Signup → AuthContext → ProtectedRoute → role-based redirect) run
 * end-to-end today. Every TODO marks exactly where real Node/Express/
 * MongoDB/JWT logic replaces this local behavior — no other file changes
 * when that happens.
 */

export async function getSession() {
  return authStore.getSession();
}

export async function persistSession(session) {
  return authStore.saveSession(session);
}

export async function clearSession() {
  return authStore.clearSession();
}

export async function login({ email, password }) {
  // TODO(backend): POST /api/auth/login
  //   - verify { email, password } against MongoDB
  //   - server issues a signed JWT and returns the user's role
  //   - replace the body below with that response
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const existing = await getSession();
  const user =
    existing?.user?.email === email
      ? existing.user
      : { name: email.split("@")[0], email, role: existing?.user?.role ?? null };

  const session = { token: "demo-token", user };
  await persistSession(session);
  return session;
}

export async function signup({ name, email, phone, role }) {
  // TODO(backend): POST /api/auth/signup
  //   - create the user document in MongoDB (hash password server-side)
  //   - server issues a signed JWT for the new user
  //   - replace the body below with that response
  if (!isValidRole(role)) {
    throw new Error(`Invalid role: ${role}`);
  }

  const user = { name, email, phone, role };
  const session = { token: "demo-token", user };
  await persistSession(session);
  return session;
}

export async function logout() {
  // TODO(backend): optionally POST /api/auth/logout to invalidate a
  // refresh token server-side before clearing the local session.
  return clearSession();
}