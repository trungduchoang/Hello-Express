// libs
import moment from "moment";
// models
import { IUserDoc } from "@/models/user/type";
// types
import { AuthTokens } from "./type";
// services
import { saveToken } from "../saveToken";
// others
import config from "@/config";
import { generateToken } from "@/utils/generators/generateToken";
import { ETokenKeys } from "@/config/authentication/token";

/**
 * Generate new security auth tokens for the specified user
 *
 * @param {IUserDoc} user
 * @returns {Promise<AuthTokens>}
 */
export const generateAuthTokens = async (user: IUserDoc): Promise<AuthTokens> => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, "minutes");
  const accessToken = generateToken(user.id, accessTokenExpires, ETokenKeys.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, "days");
  const refreshToken = generateToken(user.id, refreshTokenExpires, ETokenKeys.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, ETokenKeys.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};
