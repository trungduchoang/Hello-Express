// libs
import moment from "moment";
import { Types } from "mongoose";
// services
import { saveToken } from "../saveToken";
// others
import config from "@/config";
import { generateToken } from "@/utils/generators/generateToken";
import { ETokenKeys } from "@/config/authentication/token";

/**
 * Generate verify email token
 * @param {ObjectId} userId
 * @returns {Promise<string>}
 */
export const generateVerifyEmailToken = async (userId: Types.ObjectId): Promise<string> => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, "minutes");
  const verifyEmailToken = generateToken(userId, expires, ETokenKeys.VERIFY_EMAIL);
  await saveToken(verifyEmailToken, userId, expires, ETokenKeys.VERIFY_EMAIL);
  return verifyEmailToken;
};
