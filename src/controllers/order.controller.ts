import { Request, Response } from "express";
import { orderService } from "../services";

export const createOrderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await orderService.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error getting orders" });
  }
};

export const getOrdersByEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await orderService.getOrdersByEmail(
      req.params.email as string
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error getting orders" });
  }
};
