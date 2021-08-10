// libs
import mongoose from "mongoose";
import httpStatus from "http-status";
import { ErrorRequestHandler } from "express";
// others
import { ApiError } from "@/utils";

/**
 * ApiError
 * @description Convert normal error to ApiError instance
 * @see ApiError
 * @param err
 * @param _req
 * @param _res
 * @param next
 */
export const errorConverter: ErrorRequestHandler = (err, _req, _res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    // TODO:
    const message = String(error.message || httpStatus[statusCode]);
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};
