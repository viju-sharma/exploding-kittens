"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
require("dotenv/config");
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const ioredis_1 = __importDefault(require("ioredis"));
const user_routes_1 = require("./routes/user.routes");
const game_routes_1 = require("./routes/game.routes");
/**
 * to validate all env requirements
 */
(0, validateEnv_1.default)();
// redis setup
exports.redisClient = new ioredis_1.default();
const app = (0, express_1.default)();
const port = Number(process.env.PORT);
/**
 * Express Middlewares
 */
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use();
app.use("/api/user", user_routes_1.router);
app.use("/api/game", game_routes_1.router);
app.use(error_middleware_1.default);
/**
 * Databse connection
 */
mongoose_1.default
    .connect(process.env.MONGO_URL, {})
    .then(() => {
    console.log("Database Connected");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.log(error);
});
