// libs
import httpStatus from "http-status";
import { Types } from "mongoose";
// models
import UserModel from "@/models/user";
// services
import { getUserById } from "../getUserById";
// types
import { IUser, IUserDoc } from "@/models/user/type";
// others
import { ApiError } from "@/utils";

/**
 * Update user by id
 * @param {string | Types.ObjectId} id
 * @param {Partial<IUser>} updateBody
 * @returns {Promise<IUserDoc>}
 */
export const updateUserById = async (id: string | Types.ObjectId, updateBody: Partial<IUser>): Promise<IUserDoc> => {
  const user = await getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await UserModel.isEmailTaken(updateBody.email, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};
