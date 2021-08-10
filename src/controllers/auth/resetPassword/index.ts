// libs
import httpStatus from "http-status";
// services
import { authService } from "@/services/auth";
// others
import { catchAsync } from "@/utils";

export const resetPassword = catchAsync(
  async (req, res): Promise<void> => {
    await authService.resetPassword(typeof req.query.token === "string" ? req.query.token : "", req.body.password);
    res.status(httpStatus.NO_CONTENT).send();
  }
);
