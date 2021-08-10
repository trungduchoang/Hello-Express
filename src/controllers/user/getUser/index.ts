// libs
import httpStatus from "http-status";
// services
import { userService } from "@/services/user";
// others
import { ApiError, catchAsync } from "@/utils";

export const getUser = catchAsync(
  async (req, res): Promise<void> => {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    res.send(user);
  }
);
