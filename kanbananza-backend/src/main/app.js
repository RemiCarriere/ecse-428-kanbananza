import cors from "cors";
import morgan from "morgan";
import express from "express";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";
import errorHandler from "./middleware/error_handler";
import HttpError from "./http_error";

import config from "./config";

// authentication
import "./middleware/passport";

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

// documentation route
const openAPIDocument = require("../../docs/openapi.json");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openAPIDocument));

// api routes
const basePath = config.api.basePath ? config.api.basePath + "/" : "";
app.use(`/${basePath}`, routes);

// error-handling
app.use(errorHandler);

export default app;
