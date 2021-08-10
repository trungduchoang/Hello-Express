// libs
import nodemailer from "nodemailer";
// others
import config from "@/config";
import logger from "@/config/logger/winston";

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== "test") {
  transport
    .verify()
    .then(() => {
      logger.info(`Email transport verify successful`);
    })
    .catch((error) => {
      logger.warn(`Email transport verify returned: ${error}`);
      logger.warn(`Unable to make connection to ${config.email.smtp.host}:${config.email.smtp.port}`);
      logger.warn("Make sure you have configured the SMTP options in .env");
    });
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
export const sendMail = async (to: string, subject: string, text: string): Promise<void> => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};
