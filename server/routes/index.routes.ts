import { Router } from 'express';
import { singup, profile, login } from '../controllers/auth.controller.js';
import verifyToken from '../controllers/verify.js';
const router = Router();

router.post('/singup', singup);

router.post('/login', login);

router.get('/profile', verifyToken, profile);

export default router;