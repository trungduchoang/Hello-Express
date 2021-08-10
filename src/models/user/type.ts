// libs
import {
  AnyObject,
  Document,
  EnforceDocument,
  LeanDocument,
  Model,
  QueryWithHelpers,
  Types,
  _AllowStringsForIds,
} from "mongoose";
// types
import { TRoleNames } from "@/config/roles/type";
import { PaginationFunc } from "@/plugins/pagination/type";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: TRoleNames;
  isEmailVerified: boolean;
}

/**
 * Methods of the Mongoose DB IUser objects.
 */
export interface IUserMethods {
  isPasswordMatch: (password: string) => Promise<boolean>;
}

/**
 * Moogoose DB IUser model type with methods.
 */
export interface IUserModel extends Model<IUser, Record<string, never>, IUserMethods> {
  isEmailTaken: (email: string, excludeUserId?: string | Types.ObjectId) => Promise<boolean>;
  paginate?: PaginationFunc<IUser, IUserMethods>;
}

/**
 * Mongoose DB IUser document type with methods.
 */
export type IUserDoc = IUser & Document<Record<string, any>, Record<string, never>, IUser> & IUserMethods;

/**
 * Mongoose DB Query IUser return type.
 */
export type IUserQueryWithHelper = QueryWithHelpers<
  EnforceDocument<IUser, IUserMethods> | null,
  EnforceDocument<IUser, IUserMethods>,
  Record<string, never>,
  IUser
>;

/**
 * Moogoose DB general IUser parameter type.
 */
export type IUserLeanDoc = IUser | _AllowStringsForIds<LeanDocument<IUser>> | AnyObject;
