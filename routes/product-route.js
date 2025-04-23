import express from "express";
import { getProducts, getProductById, deleteProductById } from "../api/product_catalog.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id",deleteProductById)

export default router;
