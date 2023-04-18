import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/exceptions/http.exception";
import UserModel from "../models/User.model";

export const leaderBoardList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.find().sort({score : 1})
    return res.status(200).json(users)
  } catch (error) {
    return next(new HttpException(500, "Server Error"));
  }
};
