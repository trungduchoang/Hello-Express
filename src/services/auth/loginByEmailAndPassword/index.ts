// libs
import httpStatus from "http-status";
// services
import { userService } from "@/services/user";
// types
import { IUserDoc } from "@/models/user/type";
// others
import { ApiError } from "@/utils";

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<IUserDoc>}
 */
export const loginByEmailAndPassword = async (email: string, password: string): Promise<IUserDoc> => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};
