import express from 'express';
import { register, login, getMe, updateProfile, getPortfolioUser } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

import multer from 'multer';

// Multer config for memory storage (ImageKit needs buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/portfolio', getPortfolioUser); // Public route
router.put('/profile', protect, upload.single('profileImage'), updateProfile);

export default router;