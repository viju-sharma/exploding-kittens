import "dotenv/config";
import validateEnv from "./utils/validateEnv";
import express, { Application, Request } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import mongoose from "mongoose";
import errorMiddleware from "./middlewares/error.middleware";
import Redis from 'ioredis'
import { router as userRoutes } from "./routes/user.routes";
import { router as gameRoutes } from "./routes/game.routes";

/**
 * to validate all env requirements
 */

validateEnv();

// redis setup
export const redisClient = new Redis();

const app: Application = express();
const port: Number = Number(process.env.PORT);

/**
 * Express Middlewares
 */
app.use(express.json());
app.use(cors<Request>());
app.use(cookieParser());
app.use(logger("dev"));




app.use("/api/user", userRoutes);
app.use("/api/game", gameRoutes);

app.use(errorMiddleware);
/**
 * Databse connection
 */

mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then(() => {
    console.log("Database Connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
