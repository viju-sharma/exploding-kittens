import { Request, Response } from 'express';
import User from '../models/User.model';
import { IUser } from '../utils/interfaces/database.interface';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: IUser = req.body;
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();
    res.status(201).json({ user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};