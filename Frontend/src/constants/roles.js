// src/constants/roles.js

export const ROLES = {
  CITIZEN: "citizen",
  VOLUNTEER: "volunteer",
  NGO: "ngo",
  GOVERNMENT: "government",
};

export function isValidRole(role) {
  return Object.values(ROLES).includes(role);
}