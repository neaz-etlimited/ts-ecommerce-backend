import express from "express";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("Server running");
});

const MONGO_URL = "mongodb://localhost:27017/ecommerce";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
