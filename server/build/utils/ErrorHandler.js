"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(err, res) {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.statusCode).json({
        message: err.message,
        stack: err.stack
    });
}
exports.default = default_1;
