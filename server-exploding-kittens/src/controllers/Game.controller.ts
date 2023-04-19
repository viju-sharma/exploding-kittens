import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/exceptions/http.exception";
import UserModel from "../models/User.model";
import { AuthenticatedRequest } from "../utils/interfaces/database.interface";

export const leaderBoardList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.find().sort({ score: -1 });
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
  const userId = req.user?._id;
  try {
    const user = await UserModel.findById(userId);
    if (!user) return next(new HttpException(404, "User not found"));
    res.status(200).json(user);
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
    await UserModel.findOneAndUpdate({ _id: userId }, { $inc: { score: 1 } });
    res.status(200).send({ message: "Score Updated" });
  } catch (error) {
    return next(new HttpException(500, "Server Error"));
  }
};
