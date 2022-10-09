import { Request, Response } from 'express';
import { IUser } from '../models/User.js';

export const singin = (req : Request, res : Response) => {
    const { username, email, password } = req.body as IUser;

    console.log(`User: ${username}\nEmail:${email}\nPassword:${password}`);
    res.status(201).send('OK');
}