"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(err, req, res, next) {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    console.error(err.stack);
    res.status(status).send({
        status,
        message,
    });
}
exports.default = errorMiddleware;
