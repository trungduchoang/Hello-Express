import { loginByEmailAndPassword } from "./loginByEmailAndPassword";
import { logout } from "./logout";
import { refreshAuth } from "./refreshAuth";
import { resetPassword } from "./resetPassword";
import { verifyEmail } from "./verifyEmail";

export const authService = {
  loginByEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
