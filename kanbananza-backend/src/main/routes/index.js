import Router from "express";
import userRoutes from "./user";
import boardRoutes from "./board";
import columnRoutes from "./column";
import cardRoutes from "./card";

import HttpError from "../http_error";

const router = Router();

// root route
router.get("/", (req, res) => res.status(200).json("root"));

// register endpoints to injected router
userRoutes(router);
boardRoutes(router);
columnRoutes(router);
cardRoutes(router);

// default route handler middleware
router.use("*", (req, res, next) => {
  if (req.method === "GET") {
    next(
      new HttpError({
        code: 404,
        message: `'${req.originalUrl}' is not recognized.`,
      })
    );
  } else {
    // see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501
    next(
      new HttpError({
        code: 501,
        message: `${req.method} '${req.originalUrl}' is not supported.`,
      })
    );
  }
});

export default router;
