// libs
import httpStatus from "http-status";
// services
import { userService } from "@/services/user";
// others
import { catchAsync } from "@/utils";

export const createUser = catchAsync(
  async (req, res): Promise<void> => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
  }
);
