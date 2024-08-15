import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define the middleware function with TypeScript types
const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const secretKey: string | undefined = process.env.Secret; 
    const authHeader: string | undefined = req.headers['token'] as string; 
   const token =authHeader 
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    if (!secretKey) {
        return res.status(500).json({ error: 'Server error: Secret key not defined' });
    }

    try {
        jwt.verify(token, secretKey, (err) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ error: 'Invalid token' });
            }
            next();
        });
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default jwtMiddleware;
