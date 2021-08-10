// libs
import httpStatus from "http-status";
// services
import { userService } from "@/services/user";
import { tokenService } from "@/services/token";
// types
import { AuthTokens } from "@/services/token/generateAuthTokens/type";
// others
import { ETokenKeys } from "@/config/authentication/token";
import { ApiError } from "@/utils";

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
export const refreshAuth = async (refreshToken: string): Promise<AuthTokens> => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, ETokenKeys.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return await tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};
