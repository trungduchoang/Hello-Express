// libs
import httpStatus from "http-status";
// services
import { authService } from "@/services/auth";
// others
import { catchAsync } from "@/utils";

export const verifyEmail = catchAsync(
  async (req, res): Promise<void> => {
    await authService.verifyEmail(typeof req.query.token === "string" ? req.query.token : "");
    res.status(httpStatus.NO_CONTENT).send();
  }
);
