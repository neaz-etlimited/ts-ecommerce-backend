import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./router/productRoutes";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/ecommerce";

// Middleware setup
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "*", // Allowing specific origin if specified
  })
);

app.use(express.json());

// Database connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Handling mongoose connection errors
mongoose.connection.on("error", (error) => console.log(error));

// Routes
app.use("/api/products", productRoutes);

// Error handling middleware (last middleware)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
