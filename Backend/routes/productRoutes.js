import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import { upload } from "../middleware/uploadMiddleware.js";
import { validateProduct } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.post("/", upload.single("image"), validateProduct, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.single("image"), validateProduct, updateProduct);
router.delete("/:id", deleteProduct);

export default router;
