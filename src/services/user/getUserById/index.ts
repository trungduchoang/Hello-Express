// libs
import { Types } from "mongoose";
// models
import UserModel from "@/models/user";
// types
import { IUserQueryWithHelper } from "@/models/user/type";

/**
 * Get user by id
 * @param {Types.ObjectId} id
 * @returns {Promise<IUserQueryWithHelper>}
 */
export const getUserById = async (id: string | Types.ObjectId): Promise<IUserQueryWithHelper> => {
  return UserModel.findById(id);
};
