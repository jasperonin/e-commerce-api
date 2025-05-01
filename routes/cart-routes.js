import express from "express";
import {
  getCart,
  createItemOnCart,
  updateOnCart,
  deleteOncart,
} from "../api/cart.js";
const router = express.Router();

router.get("/", getCart);
router.post("/", createItemOnCart);
router.patch("/:id", updateOnCart);
router.delete("/:id", deleteOncart);

export default router;
