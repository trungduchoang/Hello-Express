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
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
export const verifyEmail = async (verifyEmailToken: string): Promise<void> => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, ETokenKeys.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await TokenModel.deleteMany({ user: user.id, type: ETokenKeys.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed");
  }
};
