// libs
import { Moment } from "moment";
import { Types } from "mongoose";
// services
import { ITokenDoc } from "@/models/token/type";
import TokenModel from "@/models/token";
// others
import { ETokenKeys } from "@/config/authentication/token";

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {ETokenKeys} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<ITokenDoc>}
 */
export const saveToken = async (
  token: string,
  userId: Types.ObjectId,
  expires: Moment,
  type: ETokenKeys,
  blacklisted = false
): Promise<ITokenDoc> => {
  const tokenDoc = await TokenModel.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};
