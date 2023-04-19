import { Response, NextFunction } from "express";
import token from "../utils/token";
import UserModel from "../models/User.model";
import Token from "../utils/interfaces/token.interface";
import jwt from "jsonwebtoken";
import HttpException from "../utils/exceptions/http.exception";
import { AuthenticatedRequest } from "../utils/interfaces/database.interface";
import { redisClient } from "..";

async function authenticatedMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new HttpException(401, "Unauthorised"));
  }

  const accessToken = bearer.split("Bearer ")[1].trim();
  try {
    const payload: Token | jwt.JsonWebTokenError = await token.verifyToken(
      accessToken
    );

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, "Unauthorised"));
    }

    let user;
    // redis stored user
    const cachedUser = await redisClient.get(`user-${payload.id}`);
    if (cachedUser) {
      user = JSON.parse(cachedUser);
    } else {
      user = await UserModel.findById(payload.id).select("-password").exec();
      await redisClient.set(`user-${payload.id}`, JSON.stringify(user), 'EX', 1000);
    }

    if (!user) {
      return next(new HttpException(401, "User Does Not Exists"));
    }

    req.user = user;

    return next();
  } catch (error) {
    return next(new HttpException(401, "Unauthorised"));
  }
}

export default authenticatedMiddleware;
