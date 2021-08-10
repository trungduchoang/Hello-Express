// services
import { sendMail } from "../sendMail";

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
export const sendVerificationEmail = async (to: string, token: string): Promise<void> => {
  const subject = "Email Verification";
  // TODO: replace this url with the link to the email verification
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendMail(to, subject, text);
};
