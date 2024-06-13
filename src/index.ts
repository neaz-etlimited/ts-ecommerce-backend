import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./router/product.route";
import orderRoutes from "./router/order.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/ecommerce";

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "*",
  })
);

app.use(express.json());

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

mongoose.connection.on("error", (error) => console.log(error));

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello and welcome to the ecommerce API");
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
