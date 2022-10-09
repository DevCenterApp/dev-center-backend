import { Request, Response, NextFunction } from 'express';

import JWT from 'jsonwebtoken';
import { SECRET } from '../config.js';

export default function Verify(req : Request, res : Response, next: NextFunction) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'Unauthorized'
        });
    }

    const tokenDecoded : JWT.JwtPayload = JWT.verify(token as string, SECRET!) as JWT.JwtPayload;
    req.userId = tokenDecoded.id;
    next();
}