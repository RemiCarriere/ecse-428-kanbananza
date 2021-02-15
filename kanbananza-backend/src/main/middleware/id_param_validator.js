import { isValidObjectId } from "mongoose";
import ValidationError from "../validation_error";
import HttpError from "../http_error";

export default (req, res, next) => {
  console.log("validating id");
  console.log(req.params.id);
  if (req.params.id && !isValidObjectId(req.params.id)) {
    console.log("invalid");
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
