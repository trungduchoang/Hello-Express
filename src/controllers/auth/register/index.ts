// libs
import httpStatus from "http-status";
// services
import { userService } from "@/services/user";
import { tokenService } from "@/services/token";
// others
import { catchAsync } from "@/utils";

export const register = catchAsync(
  async (req, res): Promise<void> => {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  }
);
