// libs
import httpStatus from "http-status";
import { Request, Response } from "express-serve-static-core";
import { NextFunction, ErrorRequestHandler } from "express";
// others
import config from "@/config";
import logger from "@/config/logger/winston";
import { ApiError } from "@/utils";

/**
 * errorHandler
 */
const errorHandler: ErrorRequestHandler = (err: ApiError, _req: Request, res: Response, _next: NextFunction): void => {
  let { statusCode, message } = err;
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    // TODO:
    message = String(httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };

  if (config.env === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export default errorHandler;
