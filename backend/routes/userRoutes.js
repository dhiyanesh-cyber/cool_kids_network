import express from 'express';
import { getAllUsers, getUserProfile } from '../controllers/userController.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Route to get current user's profile
router.get('/me', getUserProfile);

// Route to get all users (only for Cooler Kid and Coolest Kid)
router.get('/all', roleMiddleware(['Cooler Kid', 'Coolest Kid']), getAllUsers);


export default router;
