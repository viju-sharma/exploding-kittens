import { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password : string;

    isValidPassword(password: string): Promise<Error | boolean>;
  }