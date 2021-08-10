// libs
import httpStatus from "http-status";
// services
import { userService } from "@/services/user";
// others
import { catchAsync } from "@/utils";

export const deleteUser = catchAsync(
  async (req, res): Promise<void> => {
    await userService.deleteUserById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
  }
);
