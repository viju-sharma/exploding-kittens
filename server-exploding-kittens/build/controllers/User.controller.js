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
exports.verfiy = exports.login = exports.createUser = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const token_1 = require("../utils/token");
const http_exception_1 = __importDefault(require("../utils/exceptions/http.exception"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        /**
         * check if Acc already exist with the  same email and username
         */
        const isEmailExists = yield User_model_1.default.findOne({ email });
        if (isEmailExists)
            return next(new http_exception_1.default(400, "Email Already Exists"));
        const isUsernameExist = yield User_model_1.default.findOne({ username });
        if (isUsernameExist)
            return next(new http_exception_1.default(400, "Username Already Exists"));
        /***
         * Create User
         */
        const newUser = new User_model_1.default({ username, email, password });
        const savedUser = yield newUser.save();
        const accessToken = (0, token_1.createToken)(savedUser);
        return res.status(202).json({
            message: "User Created Successfully",
            token: accessToken,
            user: { _id: savedUser._id, email: savedUser.email, username: savedUser.username },
        });
    }
    catch (error) {
        // console.error(error);
        return next(new http_exception_1.default(500, "Server Error"));
    }
});
exports.createUser = createUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        /**
         * check if Acc already exist with the username
        */
        const user = yield User_model_1.default.findOne({ username }).select('password');
        if (!user)
            return next(new http_exception_1.default(404, "Username does not exists"));
        // check if password is valid
        console.log(password);
        const isValidPassword = yield user.isValidPassword(password);
        if (!isValidPassword) {
            return next(new http_exception_1.default(402, "Incorrect Password"));
        }
        const accessToken = (0, token_1.createToken)(user);
        return res.status(202).json({
            message: "User logged in  Successfully",
            token: accessToken,
            user: { _id: user._id, email: user.email, username: user.username },
        });
    }
    catch (error) {
        console.error(error);
        return next(new http_exception_1.default(500, "Server Error"));
    }
});
exports.login = login;
const verfiy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        return res.status(200).send({ user });
    }
    catch (error) {
        console.error(error);
        return next(new http_exception_1.default(500, "Server Error"));
    }
});
exports.verfiy = verfiy;
