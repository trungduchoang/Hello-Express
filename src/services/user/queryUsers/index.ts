// libs
import { FilterQuery } from "mongoose";
// models
import UserModel from "@/models/user";
// plugins
import { PaginateOptions, QueryResult } from "@/plugins/pagination/type";
// types
import { IUser, IUserMethods } from "@/models/user/type";

/**
 * Query for users
 * @param {FilterQuery<IUser>} filter - Mongo filter
 * @param {PaginateOptions} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult<IUser, IUserMethods>>}
 */
export const queryUsers = async (
  filter: FilterQuery<IUser>,
  options: PaginateOptions
): Promise<QueryResult<IUser, IUserMethods>> => {
  const users =
    typeof UserModel.paginate === "function"
      ? await UserModel.paginate(filter, options)
      : { results: [], page: 0, limit: 0, totalPages: 0, totalResults: 0 };
  return users;
};
