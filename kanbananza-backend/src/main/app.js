import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import express from "express";
import routes from "./routes";
import errorHandler from "./middleware/error_handler";

import config from "./config";

const databaseUrl = config.databaseURL[process.env.NODE_ENV];

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongoDB connection error:"));
db.once("open", function () {
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
