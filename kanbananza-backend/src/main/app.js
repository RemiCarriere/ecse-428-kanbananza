import cors from "cors";
import morgan from "morgan";
import express from "express";
import routes from "./routes";
import errorHandler from "./middleware/error_handler";

import config from "./config";
import HttpError from "./http_error";

const app = express();

// wrap express.json() to handle JSON SyntaxError
// see https://stackoverflow.com/a/53049009
app.use((req, res, next) => {
  express.json()(req, res, (err) => {
    if (err) {
      console.error(err);
      next(
        new HttpError({
          code: 400,
          message: "Malformed request body JSON.",
        })
      );
    }

    next();
  });
});
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // log requests
}

// app routes
const prefix = config.api.prefix ? config.api.prefix + "/" : "";

app.use(`/${prefix}`, routes);

// error-handling
app.use(errorHandler);

// authentication
require("./middleware/passport");

export default app;
