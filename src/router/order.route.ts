import express from "express";
import { orderController } from "../controllers";

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve all orders or orders by user email
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: User's email to filter orders
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrder'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: User's email
 *         productId:
 *           type: string
 *           description: ID of the product
 *         price:
 *           type: number
 *           description: Price of the product
 *         quantity:
 *           type: number
 *           description: Quantity of the product
 *     CreateOrder:
 *       type: object
 *       required:
 *         - email
 *         - productId
 *         - price
 *         - quantity
 *       properties:
 *         email:
 *           type: string
 *           description: User's email
 *         productId:
 *           type: string
 *           description: ID of the product
 *         price:
 *           type: number
 *           description: Price of the product
 *         quantity:
 *           type: number
 *           description: Quantity of the product
 */

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
