import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  email: string;
  productId: mongoose.Types.ObjectId;
  price: number;
  quantity: number;
}

const OrderSchema: Schema = new Schema(
  {
    email: { type: String, required: true, trim: true, match: /.+\@.+\..+/ },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
