import express from "express";
import { orderController } from "../controllers";

const router = express.Router();

router.post("/", orderController.createOrderController);
router.get("/", orderController.getOrders);
router.get("/email", orderController.getOrdersByEmail);

export default router;
