import { Router } from "express";
import { createUser, login, verfiy } from "../controllers/User.controller";
import authenticatedMiddleware from "../middlewares/authenticated.middleware";

export const router = Router();

router.post("/create", createUser);
router.post("/login", login);
router.get("/verify", authenticatedMiddleware, verfiy);
