// services
import { sendMail } from "../sendMail";

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
export const sendResetPasswordEmail = async (to: string, token: string): Promise<void> => {
  const subject = "Reset password";
  // TODO: replace this url with the link to the reset password
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendMail(to, subject, text);
};
