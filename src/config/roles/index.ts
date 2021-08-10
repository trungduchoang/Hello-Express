// types
import { TActionNames, TRoleNames } from "./type";

const allRoles: { [key in TRoleNames]: readonly TActionNames[] } = {
  user: Object.freeze([]),
  admin: Object.freeze(["getUsers", "manageUsers"]),
};

export const roles = Object.freeze(Object.keys(allRoles));
export const rolesMap = Object.freeze(new Map(Object.entries(Object.freeze(allRoles))));
