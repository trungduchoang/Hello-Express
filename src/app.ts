// libs
import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import passport from "passport";
import httpStatus from "http-status";
// configs
import config from "@/config";
import * as morgan from "@/config/logger/morgan";
import jwtStrategy from "@/config/authentication/passport";
// middlewares
import authLimiter from "@/middlewares/auth/limiter";
import errorHandler from "@/middlewares/errorHandler";
// routes
import routes from "@/routes/v1";
// others
import { errorConverter, ApiError } from "@/utils";

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
// TODO: Use "import xss from "xss-clean";" here
// app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
// app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((_, __, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
