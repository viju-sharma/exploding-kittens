import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/exceptions/http.exception';

function errorMiddleware(
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    console.error(err.stack);
    res.status(status).send({
        status,
        message,
    });
}

export default errorMiddleware;
