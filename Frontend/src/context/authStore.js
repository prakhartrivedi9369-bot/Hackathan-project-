// src/context/authStore.js

/**
 * authStore — session persistence layer.
 * Encapsulates *where* a session lives behind three functions:
 * getSession / saveSession / clearSession. authService (and nothing else)
 * calls these. The storage mechanism below is localStorage today, but
 * nothing outside this file knows that — switching to cookies,
 * sessionStorage, or something else later means editing only the
 * function bodies here.
 */

const SESSION_KEY = "guardianmesh_session";

function read() {
  return localStorage.getItem(SESSION_KEY);
}

function write(value) {
  localStorage.setItem(SESSION_KEY, value);
}

function remove() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  const raw = read();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveSession(session) {
  write(JSON.stringify(session));
}

export function clearSession() {
  remove();
}