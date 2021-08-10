// libs
import jwt from "jsonwebtoken";
import moment, { Moment } from "moment";
import { Types } from "mongoose";
// others
import config from "@/config";
import { ETokenKeys } from "@/config/authentication/token";

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {ETokenKeys} type
 * @param {jwt.Secret} [secret]
 * @returns {string}
 */
export const generateToken = (
  userId: Types.ObjectId,
  expires: Moment,
  type: ETokenKeys = ETokenKeys.ACCESS,
  secret: jwt.Secret = config.jwt.secret
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};
