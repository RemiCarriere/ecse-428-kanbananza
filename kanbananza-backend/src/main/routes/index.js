import Router from "express";
import userRoutes from "./user";
import boardRoutes from "./board";

import HttpError from "../http_error";

const router = Router();

// root route
router.get("/", (req, res) => res.status(200).json("root"));

// register endpoints to injected router
userRoutes(router);
boardRoutes(router);

// default route handler middleware
router.use("*", (req, res, next) => {
  next(
    new HttpError({
      code: 404,
      message: `Route '${req.originalUrl}' not supported.`,
    })
  );
});

export default router;
