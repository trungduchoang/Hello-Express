// models
import UserModel from "@/models/user";
// types
import { IUserQueryWithHelper } from "@/models/user/type";

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<IUserQueryWithHelper>}
 */
export const getUserByEmail = async (email: string): Promise<IUserQueryWithHelper> => {
  return UserModel.findOne({ email });
};
