import express from "express";
import { productController } from "../controllers";

import {
  validateProduct,
  validateProductUpdate,
} from "../middlewares/productValidation";

const router = express.Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(validateProduct, productController.addProduct)
  .get(productController.searchProduct);

router
  .route("/:productId")
  .get(productController.getProduct)
  .put(validateProductUpdate, productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
