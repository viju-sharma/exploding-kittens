import { Router } from "express";
import authenticatedMiddleware from "../middlewares/authenticated.middleware";
import { gameWon, leaderBoardList, userScore } from "../controllers/Game.controller";

export const router = Router();

router.get("/leaderboard", authenticatedMiddleware, leaderBoardList);
router.get("/score", authenticatedMiddleware, userScore);
router.post("/won", authenticatedMiddleware, gameWon);
