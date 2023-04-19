"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const User_controller_1 = require("../controllers/User.controller");
const authenticated_middleware_1 = __importDefault(require("../middlewares/authenticated.middleware"));
exports.router = (0, express_1.Router)();
exports.router.post("/create", User_controller_1.createUser);
exports.router.post("/login", User_controller_1.login);
exports.router.get("/verify", authenticated_middleware_1.default, User_controller_1.verfiy);
