// libs
import { model, Schema, Types } from "mongoose";
// types
import { IToken, ITokenModel } from "./type";
// plugins
import toJSON from "@/plugins/toJSON";
// others
import { ETokenKeys } from "@/config/authentication/token";

const tokenSchema = new Schema<IToken, ITokenModel>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [ETokenKeys.REFRESH, ETokenKeys.RESET_PASSWORD, ETokenKeys.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const TokenModel: ITokenModel = model<IToken>("Token", tokenSchema);

export default TokenModel;
