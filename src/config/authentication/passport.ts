// libs
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifyCallback } from "passport-jwt";
// models
import UserModel from "@/models/user";
// others
import config from "..";
import { ETokenKeys } from "./token";

const jwtOptions: StrategyOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify: VerifyCallback = async (payload, done): Promise<void> => {
  try {
    if (payload.type !== ETokenKeys.ACCESS) {
      throw new Error("Invalid token type");
    }
    const user = await UserModel.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
