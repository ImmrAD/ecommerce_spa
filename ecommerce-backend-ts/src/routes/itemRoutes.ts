// src/routes/itemRoutes.ts
import { Router } from 'express';
import { getItems } from '../controllers/itemController';

const router = Router();
router.get('/', getItems);
// You can add POST, PUT, DELETE routes here, protected by middleware
export default router;