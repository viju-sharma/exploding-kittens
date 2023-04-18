import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;

  isValidPassword(password: string): Promise<Error | boolean>;
}

export interface AuthenticatedRequest extends Request {
  user?: { _id: string; username: string; email: string };
}
