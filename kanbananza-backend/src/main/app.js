import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import express from "express";

import "dotenv/config";

import routes from "./routes";
import errorHandler from "./middleware/error_handler";

const config = {
  db: { development: "placeholder", production: "placeholder 2" },
};

const databaseUrl = process.env.NODE_ENV
  ? config[process.env.NODE_ENV]
  : config.db.development;

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongoDB connection error:"));
db.once("open", () => {
  console.log("connected to database");
});

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
app.use("/", routes);

// error-handling
app.use(errorHandler);

export default app;
