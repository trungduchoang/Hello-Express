// libs
import httpStatus from "http-status";
// services
import { tokenService } from "@/services/token";
import { mailService } from "@/services/email";
// others
import { catchAsync } from "@/utils";

export const forgotPassword = catchAsync(
  async (req, res): Promise<void> => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
    await mailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
    res.status(httpStatus.NO_CONTENT).send();
  }
);
