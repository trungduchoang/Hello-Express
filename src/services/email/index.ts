import { sendMail } from "./sendMail";
import { sendResetPasswordEmail } from "./sendResetPasswordEmail";
import { sendVerificationEmail } from "./sendVerificationEmail";

export const mailService = {
  sendMail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
