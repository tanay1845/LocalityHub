// routes/authRoutes.js
import express from 'express';
import { signup, login, getUser, getUserProfile } from '../controllers/User.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', authMiddleware, login);
router.get('/getUser',authMiddleware,getUser);
router.get('/getUserProfile',authMiddleware,getUserProfile);

export default router;
