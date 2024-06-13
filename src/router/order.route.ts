import express from "express";
import { orderController } from "../controllers";

const router = express.Router();

router
  .route("/")
  .get((req, res, next) => {
    if (req.query.email) {
      orderController.getOrdersByEmail(req, res);
    } else {
      orderController.getOrders(req, res);
    }
  })
  .post(orderController.createOrderController);

export default router;
