// src/context/AuthContext.jsx
import { createContext, useCallback, useEffect, useState } from "react";
import * as authService from "../services/authService";

/**
 * AuthContext is the single source of truth for auth state in the app.
 * Nothing outside this file and useAuth.js should import it directly —
 * components consume auth exclusively through useAuth().
 */
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Bootstrap from persisted session on first mount (page refresh, etc.)
  useEffect(() => {
    let mounted = true;
    authService.getSession().then((session) => {
      if (!mounted) return;
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(async (credentials) => {
    const session = await authService.login(credentials);
    setUser(session.user);
    setIsAuthenticated(true);
    return session;
  }, []);

  const signup = useCallback(async (payload) => {
    const session = await authService.signup(payload);
    setUser(session.user);
    setIsAuthenticated(true);
    return session;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = { user, isAuthenticated, isLoading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}