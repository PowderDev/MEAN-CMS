import { Response } from "express";

export default function (err: any, res: Response) {
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Error'

    res.status(err.statusCode).json({
        message: err.message,
        stack: err.stack
    })
}
