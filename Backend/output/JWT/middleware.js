"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Define the middleware function with TypeScript types
const jwtMiddleware = (req, res, next) => {
    const secretKey = process.env.Secret;
    const authHeader = req.headers['token'];
    const token = authHeader;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    if (!secretKey) {
        return res.status(500).json({ error: 'Server error: Secret key not defined' });
    }
    try {
        jsonwebtoken_1.default.verify(token, secretKey, (err) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ error: 'Invalid token' });
            }
            next();
        });
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};
exports.default = jwtMiddleware;
