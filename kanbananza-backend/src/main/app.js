import cors from "cors";
import express from "express";

import "dotenv/config";

import controller from "./api";
import { errorHandler } from "./middleware/error_handlers";

const app = express();

// application-level middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", controller);

// error-handling middleware
app.use(errorHandler);

export default app;
