import { isValidObjectId } from "mongoose";
import ValidationError from "../validation_error";
import HttpError from "../http_error";

export default (req, res, next) => {
  if (req.params.id && !isValidObjectId(req.params.id)) {
    return next(
      new HttpError({
        code: 400,
        message: `Invalid param.`,
        errors: [
          new ValidationError({
            path: "id",
            reason: `resource ID is invalid.`,
            data: req.params.id,
          }),
        ],
      })
    );
  }
  next();
};
