import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";

import indexRouter from "./routes/index";

const app: Application = express();

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// setup dotenv
dotenv.config();

// middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api", indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
