// libs
import jwt from "jsonwebtoken";
// services
import { ITokenDoc } from "@/models/token/type";
import TokenModel from "@/models/token";
// others
import config from "@/config";
import { ETokenKeys } from "@/config/authentication/token";

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {ETokenKeys} type
 * @returns {Promise<ITokenDoc>}
 */
export const verifyToken = async (token: string, type: ETokenKeys): Promise<ITokenDoc> => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await TokenModel.findOne({
    token,
    type,
    user: typeof payload.sub === "function" ? payload.sub() : payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};
