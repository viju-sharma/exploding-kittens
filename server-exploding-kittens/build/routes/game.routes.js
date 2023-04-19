"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authenticated_middleware_1 = __importDefault(require("../middlewares/authenticated.middleware"));
const Game_controller_1 = require("../controllers/Game.controller");
exports.router = (0, express_1.Router)();
exports.router.get("/leaderboard", authenticated_middleware_1.default, Game_controller_1.leaderBoardList);
exports.router.get("/score", authenticated_middleware_1.default, Game_controller_1.userScore);
exports.router.post("/won", authenticated_middleware_1.default, Game_controller_1.gameWon);
