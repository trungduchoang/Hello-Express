import { saveToken } from "./saveToken";
import { verifyToken } from "./verifyToken";
import { generateAuthTokens } from "./generateAuthTokens";
import { generateResetPasswordToken } from "./generateResetPasswordToken";
import { generateVerifyEmailToken } from "./generateVerifyEmailToken";

export const tokenService = {
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
};
