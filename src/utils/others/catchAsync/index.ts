import { ParamsDictionary, Query, Request, Response } from "express-serve-static-core";
import { NextFunction, RequestHandler } from "express";

/**
 * catchAsync
 * For convenience, while controllers catch the errors and forward them to the error handling middleware
 * @param fn
 */
export const catchAsync = <
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query,
  Locals extends Record<string, any> = Record<string, any>
>(
  fn: RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>
): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> => {
  return (req: Request<P, ResBody, ReqBody, ReqQuery, Locals>, res: Response<ResBody, Locals>, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
