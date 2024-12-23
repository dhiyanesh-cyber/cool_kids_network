// routes/adminRoutes.js
import express from 'express';
import { assignRole, generateToken } from '../controllers/adminController.js'
import { adminAuthMiddleware } from '../middleware/adminAuthMiddleware.js';

const router = express.Router();

router.put('/assign-role', adminAuthMiddleware, assignRole);
router.post('/generate-token', generateToken);

export default router;