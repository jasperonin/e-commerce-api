import express from "express";
import { getProducts, getProductById, deleteProductById, addProduct, updateProduct } from "../api/product_catalog.js";
import { validateApiKey } from "../middleware/validate-api-key.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/",validateApiKey,addProduct);
router.patch("/:id", updateProduct);
router.delete("/:id",deleteProductById);

export default router;
