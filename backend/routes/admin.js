import express from 'express';
import { updateUserRole } from '../controllers/userController.js';

const router = express.Router();

router.put('/assign-role', updateUserRole);

export default router;
