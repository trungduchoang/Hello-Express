// libs
import { FilterQuery } from "mongoose";
// types
import { PaginateOptions } from "@/plugins/pagination/type";
import { IUser } from "@/models/user/type";
// services
import { userService } from "@/services/user";
// others
import { pick, catchAsync } from "@/utils";

const paginateOptionsKeys: readonly (keyof PaginateOptions)[] = ["limit", "page", "populate", "sortBy"];

export const getUsers = catchAsync(
  async (req, res): Promise<void> => {
    const filter: FilterQuery<IUser> = pick(req.query, ["name", "role"]) as FilterQuery<IUser>;
    const options = paginateOptionsKeys.reduce<PaginateOptions>(
      (accumulator: PaginateOptions, key: keyof PaginateOptions): PaginateOptions => {
        if (Object.prototype.hasOwnProperty.call(req.query, key)) {
          const value = req.query[key];
          if (value !== null && value !== undefined) {
            accumulator[key] = String(value);
          }
        }
        return accumulator;
      },
      {}
    );
    const result = await userService.queryUsers(filter, options);
    res.send(result);
  }
);
