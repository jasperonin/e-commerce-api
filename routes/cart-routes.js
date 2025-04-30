import express from 'express';
import { getCart } from '../api/cart.js';
const router = express.Router();

router.get("/", getCart );

export default router;