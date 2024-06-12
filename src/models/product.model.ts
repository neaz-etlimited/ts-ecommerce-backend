import mongoose, { Schema, Document } from "mongoose";

interface IVariant {
  type: string;
  value: string;
}

interface IInventory {
  quantity: number;
  inStock: boolean;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: IVariant[];
  inventory: IInventory;
}

const VariantSchema: Schema = new Schema(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const InventorySchema: Schema = new Schema(
  {
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, required: true },
  },
  { _id: false }
);

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    variants: { type: [VariantSchema], default: [] },
    inventory: { type: InventorySchema, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
