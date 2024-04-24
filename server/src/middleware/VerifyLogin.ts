import { ExpressMiddlewareInterface } from "routing-controllers";
import { AuthentificatedRequest } from "../AuthentificatedRequest/AuthentificatedRequest";
import { NextFunction, Response } from "express";
import { UnauthorizedError } from "../costumError/CustomErrors";
import jwt from "jsonwebtoken";
import { injectable } from "inversify";

@injectable()
export class VerifyLogin implements ExpressMiddlewareInterface {
  use(req: AuthentificatedRequest, _: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      throw new UnauthorizedError();
    }
    const token = authHeaders.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECERT_KEY
    ) as jwt.JwtPayload;
    if (!req.user) {
      req.user = {
        id: "",
      };
    }
    req.user.id = decoded.id;
    next();
  }
}
