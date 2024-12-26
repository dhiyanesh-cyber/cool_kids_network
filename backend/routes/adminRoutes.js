// routes/adminRoutes.js
import express from 'express';
import { assignRole, createMaintainer } from '../controllers/adminController.js'

const router = express.Router();

router.put('/assign-role', assignRole);
router.post('/create-maintainer', createMaintainer);


export default router;