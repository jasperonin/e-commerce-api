import express from 'express';
import { getOrderById, updateProductById, getOrders, createOrder } from '../api/orders.js';
import { validateApiKey } from '../middleware/validate-api-key.js';

const router = express.Router();

router.get("/:id", validateApiKey, getOrderById );
router.get("/",getOrders);
router.post("/",validateApiKey, createOrder);
router.patch("/:id/status", validateApiKey, updateProductById);

export default router;