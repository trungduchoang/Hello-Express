import { createUser } from "./createUser";
import { queryUsers } from "./queryUsers";
import { getUserById } from "./getUserById";
import { getUserByEmail } from "./getUserByEmail";
import { updateUserById } from "./updateUserById";
import { deleteUserById } from "./deleteUserById";

export const userService = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
