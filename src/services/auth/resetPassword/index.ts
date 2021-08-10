// libs
import httpStatus from "http-status";
// services
import { userService } from "@/services/user";
import { tokenService } from "@/services/token";
// models
import TokenModel from "@/models/token";
// others
import { ApiError } from "@/utils";
import { ETokenKeys } from "@/config/authentication/token";

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
export const resetPassword = async (resetPasswordToken: string, newPassword: string): Promise<void> => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, ETokenKeys.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await TokenModel.deleteMany({ user: user.id, type: ETokenKeys.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
  }
};
