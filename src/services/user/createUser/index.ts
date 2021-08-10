// libs
import httpStatus from "http-status";
// models
import UserModel from "@/models/user";
// types
import { IUserDoc, IUserLeanDoc } from "@/models/user/type";
// others
import { ApiError } from "@/utils";

/**
 * Create a user
 * @param {IUserLeanDoc} userBody
 * @returns {Promise<IUserDoc>}
 */
export const createUser = async (userBody: IUserLeanDoc): Promise<IUserDoc> => {
  if (await UserModel.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return UserModel.create(userBody);
};
