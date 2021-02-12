import cors from "cors";
import morgan from "morgan";
import express from "express";

import "dotenv/config";

import controller from "./api";
import errorHandler from "./api/middleware/error_handler";

const app = express();

// middleware

// http
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // log requests
}

// app routes
app.use("/", controller);

// error-handling
app.use(errorHandler);

export default app;
