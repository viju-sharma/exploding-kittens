import { NextFunction, Request, Response } from "express";
import User from "../models/User.model";
import {
  AuthenticatedRequest,
  IUser,
} from "../utils/interfaces/database.interface";
import { createToken } from "../utils/token";
import HttpException from "../utils/exceptions/http.exception";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password }: IUser = req.body;
    /**
     * check if Acc already exist with the  same email and username
     */
    const isEmailExists = await User.findOne({ email });
    if (isEmailExists)
      return next(new HttpException(400, "Email Already Exists"));
    const isUsernameExist = await User.findOne({ username });
    if (isUsernameExist)
      return next(new HttpException(400, "Username Already Exists"));

    /***
     * Create User
     */
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    const accessToken = createToken(savedUser);

    return res.status(202).json({
      message: "User Created Successfully",
      token: accessToken,
      user: { _id: savedUser._id, email: savedUser.email, username: savedUser.username },
    });
  } catch (error) {
    // console.error(error);
    return next(new HttpException(500, "Server Error"));
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password }: IUser = req.body;
    /**
     * check if Acc already exist with the username
    */
   const user = await User.findOne({ username }).select('password');
   if (!user) return next(new HttpException(404, "Username does not exists"));
   
   // check if password is valid
   console.log(password)
   const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return next(new HttpException(402, "Incorrect Password"));
    }

    const accessToken = createToken(user);

    return res.status(202).json({
      message: "User logged in  Successfully",
      token: accessToken,
      user: { _id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error(error);
    return next(new HttpException(500, "Server Error"));
  }
};

export const verfiy = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    return res.status(200).send({ user });
  } catch (error) {
    console.error(error);
    return next(new HttpException(500, "Server Error"));
  }
};
