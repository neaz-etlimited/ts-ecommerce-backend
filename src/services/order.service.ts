import Order, { IOrder } from "../models/order.model";

export const createOrder = async (
  newOrder: Partial<IOrder>
): Promise<IOrder> => {
  try {
    const order = new Order(newOrder);
    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async (): Promise<IOrder[]> => {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    throw error;
  }
};

export const getOrdersByEmail = async (email: string): Promise<IOrder[]> => {
  try {
    const orders = await Order.find({ email });
    return orders;
  } catch (error) {
    throw error;
  }
};

