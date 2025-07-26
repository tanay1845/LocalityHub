// routes/authRoutes.js
import {upload} from "../utils/multer.js";
// import cloudinary from "../utils/cloudinary.js";
import express from 'express';
import { signup, login, getUser, getUserProfile } from '../controllers/User.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createService, getServices, getServicesById } from '../controllers/Srvice.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', authMiddleware,login);
router.get('/getUser',authMiddleware,getUser);
router.get('/getUserProfile',authMiddleware,getUserProfile);

// Service routes
router.post('/services/create', authMiddleware, upload.single('image'), createService);
router.get('/services',getServices);
router.get('/services/:serviceId', getServicesById);

export default router;
