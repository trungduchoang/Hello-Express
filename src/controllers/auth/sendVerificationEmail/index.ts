// libs
import httpStatus from "http-status";
// services
import { tokenService } from "@/services/token";
import { mailService } from "@/services/email";
// types
import { IUserDoc } from "@/models/user/type";
// others
import { catchAsync } from "@/utils";

export const sendVerificationEmail = catchAsync(
  async (req, res): Promise<void> => {
    const reqUser = req.user as IUserDoc;
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(reqUser?.id);
    await mailService.sendVerificationEmail(reqUser?.email, verifyEmailToken);
    res.status(httpStatus.NO_CONTENT).send();
  }
);
