// libs
import moment from "moment";
import httpStatus from "http-status";
// services
import { userService } from "../../user";
import { generateToken } from "@/utils/generators/generateToken";
import { saveToken } from "../saveToken";
// others
import config from "@/config";
import { ETokenKeys } from "@/config/authentication/token";
import { ApiError } from "@/utils";

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
export const generateResetPasswordToken = async (email: string): Promise<string> => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "No users found with this email");
  }
  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, "minutes");
  const resetPasswordToken = generateToken(user.id, expires, ETokenKeys.RESET_PASSWORD);
  await saveToken(resetPasswordToken, user.id, expires, ETokenKeys.RESET_PASSWORD);
  return resetPasswordToken;
};
