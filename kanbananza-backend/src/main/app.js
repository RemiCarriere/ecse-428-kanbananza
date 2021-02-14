import cors from "cors";
import morgan from "morgan";
import express from "express";
import routes from "./routes";
import errorHandler from "./middleware/error_handler";

import config from "./config";

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
const prefix = config.api.prefix + "/" || "";

app.use(`/${prefix}`, routes);

// error-handling
app.use(errorHandler);

export default app;
