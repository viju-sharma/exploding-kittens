import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/exceptions/http.exception";
import UserModel from "../models/User.model";
import { AuthenticatedRequest } from "../utils/interfaces/database.interface";
import { redisClient } from "..";

export const leaderBoardList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cachedLeaderboard = await redisClient.get("leaderBoard");
    if (cachedLeaderboard)
      return res.status(200).json(JSON.parse(cachedLeaderboard));

    const users = await UserModel.find().sort({ score: -1 });
    await redisClient.set('leaderBoard', JSON.stringify(users), 'EX', 10)
    return res.status(200).json(users);
  } catch (error) {
    return next(new HttpException(500, "Server Error"));
  }
};

export const userScore = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    return next(new HttpException(500, "Server Error"));
  }
};

export const gameWon = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  try {
    const user = await UserModel.findOneAndUpdate({ _id: userId }, { $inc: { score: 1 } },{
      new: true
    });
    await redisClient.set(`user-${userId}`, JSON.stringify(user), 'EX', 1000);
    res.status(200).send({ message: "Score Updated" });
  } catch (error) {
    return next(new HttpException(500, "Server Error"));
  }
};
