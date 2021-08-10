// libs
import httpStatus from "http-status";
// services
import { authService } from "@/services/auth";
// others
import { catchAsync } from "@/utils";

export const logout = catchAsync(
  async (req, res): Promise<void> => {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
  }
);
