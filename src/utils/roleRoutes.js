// src/utils/roleRoutes.js

import { ROLES } from "../constants/roles";

/**
 * Single source of truth for role-based redirects.
 *
 * Currently the application has only one Dashboard page.
 * Therefore, every authenticated user is redirected to the same
 * dashboard route regardless of role.
 *
 * When separate dashboards are implemented later, simply update
 * the values below without changing Login, Signup, or AuthContext.
 */

export const ROLE_ROUTES = Object.freeze({
  [ROLES.CITIZEN]: "/dashboard",
  [ROLES.VOLUNTEER]: "/dashboard",
  [ROLES.NGO]: "/dashboard",
  [ROLES.GOVERNMENT]: "/dashboard",
});

const DEFAULT_ROUTE = "/dashboard";

/**
 * Returns the dashboard route for a given role.
 * Falls back to the default dashboard if the role is missing or invalid.
 */
export function getRouteForRole(role) {
  return ROLE_ROUTES[role] ?? DEFAULT_ROUTE;
}