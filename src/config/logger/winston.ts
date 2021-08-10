// libs
import { createLogger, format, transports } from "winston";
// others
import config from "..";

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    return Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = createLogger({
  level: config.env === "development" ? "debug" : "info",
  format: format.combine(
    enumerateErrorFormat(),
    config.env === "development" ? format.colorize() : format.uncolorize(),
    format.splat(),
    format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});

export default logger;
