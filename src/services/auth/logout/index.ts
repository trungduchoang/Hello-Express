// libs
import httpStatus from "http-status";
// models
import TokenModel from "@/models/token";
// others
import { ApiError } from "@/utils";
import { ETokenKeys } from "@/config/authentication/token";

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
export const logout = async (refreshToken: string): Promise<void> => {
  const refreshTokenDoc = await TokenModel.findOne({ token: refreshToken, type: ETokenKeys.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  await refreshTokenDoc.remove();
};
