import express from 'express';
import { createOrder } from '../Controllers/OrderController.js';
import isAuthenticated from '../Middlewares/Auth.js';

const router = express.Router();
router.post('/create', isAuthenticated, createOrder);

export default router;
