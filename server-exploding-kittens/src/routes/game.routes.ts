import { Router } from "express";
import { createUser, login, verfiy } from "../controllers/User.controller";
import authenticatedMiddleware from "../middlewares/authenticated.middleware";
import { leaderBoardList } from "../controllers/Game.controller";

export const router = Router();

router.get("/leaderboard", authenticatedMiddleware,leaderBoardList);

