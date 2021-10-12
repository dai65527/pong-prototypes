import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          if (req && req.cookies) {
            return req.cookies["pongjwttoken"];
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: "secret",
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
