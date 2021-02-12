import { Router } from "express";
import HttpError from "./http_error";

const router = Router();

router.get("/", (req, res) => res.status(200).json("root OK"));

// user routes here

// unmatched route handler
router.use("*", (req, res, next) => {
  next(
    new HttpError({
      status: 404,
      message: `Route '${req.originalUrl}' not supported.`,
    })
  );
});

export default router;
