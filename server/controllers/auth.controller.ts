import { Request, Response } from 'express';
import User, { IUser } from '../models/User.js';

import JWT from 'jsonwebtoken';
import { SECRET } from '../config.js';

export const singup = async (req : Request, res : Response) => {
    const { username, email, password } = req.body as IUser;

    const user = new User({
        username: username,
        email: email,
        password: password
    });
    user.password = await user.encrypt(user.password);

    const token = JWT.sign({id: user._id}, SECRET!, {
        expiresIn: 60 * 60 * 24 // 24 hours
    });
    user.save()
        .then(() => {
            res.status(201).json({ auth: true, token: token });
        })
        .catch((err) => {
            res.status(409).json({ err: err.message });
        });
}

export const login = async (req : Request, res : Response) => {
    const { email, password } = req.body as IUser;
    const user = await User.findOne({email: email});
    if (!user) { return res.status(404).json({err: "Email doesn't exists."}); }

    const isValid = await user.validatePassword(password);
    if (!isValid) { 
        return res.status(401).json({
            auth: false,
            token: null,
            err: "The password is invalid."
        }); 
    }
    const token = JWT.sign({id: user._id}, SECRET!, {
        expiresIn: 60 * 60 * 24 // 24 hours
    });

    res.status(200).json({
        auth: true,
        token: token
    });

};

export const profile = async (req : Request, res : Response) => {

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
        return res.status(404).json({err: 'No user found.'});
    }

    res.status(200).json(user);
}