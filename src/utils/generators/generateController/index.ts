// libs
import { RequestHandler } from "express";
import { ParamsDictionary, Query } from "express-serve-static-core";

/**
 * generateController
 * @param fn
 */
export const generateController = <
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query,
  Locals extends Record<string, any> = Record<string, any>
>(
  fn: RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>
): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> => {
  return (req, res, next): void => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
