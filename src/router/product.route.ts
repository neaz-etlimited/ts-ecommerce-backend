import express from "express";
import { productController } from "../controllers";

import {
  validateProduct,
  validateProductUpdate,
} from "../middlewares/productValidation";

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    if (req.query.search) {
      productController.searchProduct(req, res);
    } else {
      productController.getProducts(req, res);
    }
  })
  .post(validateProduct, productController.addProduct);

router
  .route("/:productId")
  .get(productController.getProduct)
  .put(validateProductUpdate, productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
