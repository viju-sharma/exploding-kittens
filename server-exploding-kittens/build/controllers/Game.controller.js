"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameWon = exports.userScore = exports.leaderBoardList = void 0;
const http_exception_1 = __importDefault(require("../utils/exceptions/http.exception"));
const User_model_1 = __importDefault(require("../models/User.model"));
const __1 = require("..");
const leaderBoardList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedLeaderboard = yield __1.redisClient.get("leaderBoard");
        if (cachedLeaderboard)
            return res.status(200).json(JSON.parse(cachedLeaderboard));
        const users = yield User_model_1.default.find().sort({ score: -1 });
        yield __1.redisClient.set('leaderBoard', JSON.stringify(users), 'EX', 10);
        return res.status(200).json(users);
    }
    catch (error) {
        return next(new http_exception_1.default(500, "Server Error"));
    }
});
exports.leaderBoardList = leaderBoardList;
const userScore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json(req.user);
    }
    catch (error) {
        return next(new http_exception_1.default(500, "Server Error"));
    }
});
exports.userScore = userScore;
const gameWon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    try {
        const user = yield User_model_1.default.findOneAndUpdate({ _id: userId }, { $inc: { score: 1 } }, {
            new: true
        });
        yield __1.redisClient.set(`user-${userId}`, JSON.stringify(user), 'EX', 1000);
        res.status(200).send({ message: "Score Updated" });
    }
    catch (error) {
        return next(new http_exception_1.default(500, "Server Error"));
    }
});
exports.gameWon = gameWon;
