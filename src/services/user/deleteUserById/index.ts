// libs
import httpStatus from "http-status";
import { Types } from "mongoose";
// services
import { getUserById } from "../getUserById";
// types
import { IUserDoc } from "@/models/user/type";
// others
import { ApiError } from "@/utils";

/**
 * Delete user by id
 * @param {string | Types.ObjectId} userId
 * @returns {Promise<IUserDoc>}
 */
export const deleteUserById = async (userId: string | Types.ObjectId): Promise<IUserDoc> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};
