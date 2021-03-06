import ValidationError from "../validation_error";
import HttpError from "../http_error";
import { isValidMongooseObjectId } from "../utils/validators";

export default (req, res, next) => {
  if (req.params.id === undefined || !isValidMongooseObjectId(req.params.id)) {
    return next(
      new HttpError({
        code: 400,
        message: `Invalid path parameter.`,
        errors: [
          new ValidationError({
            path: "id",
            reason: `resource ID is invalid`,
            data: req.params.id,
          }),
        ],
      })
    );
  }
  return next();
};
