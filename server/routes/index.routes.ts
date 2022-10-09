import { Router } from 'express';
import { singin } from '../controllers/auth.controller.js';
const router = Router();

router.post('/singin', singin);

export default router;