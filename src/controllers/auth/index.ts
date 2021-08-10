import { register } from "./register";
import { login } from "./login";
import { logout } from "./logout";
import { refreshTokens } from "./refreshTokens";
import { forgotPassword } from "./forgotPassword";
import { resetPassword } from "./resetPassword";
import { sendVerificationEmail } from "./sendVerificationEmail";
import { verifyEmail } from "./verifyEmail";

export const authController = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
