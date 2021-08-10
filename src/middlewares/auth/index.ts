// libs
import passport from "passport";
import httpStatus from "http-status";
import { Request } from "express-serve-static-core";
import { RequestHandler } from "express";
// types
import { IUserDoc } from "@/models/user/type";
import { TActionNames } from "@/config/roles/type";
// others
import { rolesMap } from "@/config/roles";
import { ApiError } from "@/utils";

type AuthenticateCallback = (err?: any, user?: IUserDoc, info?: any) => Promise<void>;

/**
 * auth
 * @description Check required Permission before processing incoming request
 * @description Add login required only if no permission included
 * @param requiredPermissions
 * @returns Promise
 */
export default function auth(...requiredPermissions: TActionNames[]): RequestHandler {
  return async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate("jwt", { session: false }, checkRole(req, resolve, reject, requiredPermissions))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };
}

/**
 * checkRole
 * @param req
 * @param resolve
 * @param reject
 * @param requiredPermissions
 * @returns
 */
function checkRole(
  req: Request,
  resolve: (value: void | PromiseLike<void>) => void,
  reject: (reason?: any) => void,
  requiredPermissions: TActionNames[]
): AuthenticateCallback {
  return async (err, user, info) => {
    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
    }
    req.user = user;
    if (requiredPermissions.length) {
      const userRoles = rolesMap.get(user.role);
      const hasRequiredRights = userRoles && requiredPermissions.every((action) => userRoles.includes(action));
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
      }
    }
    resolve();
  };
}
