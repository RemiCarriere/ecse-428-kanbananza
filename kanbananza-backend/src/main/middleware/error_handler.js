import HttpError from "../http_error";

export default (err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(err.stack);
  }

  let httpError;

  if (err instanceof HttpError) {
    httpError = err;
  } else if (err.name === "UnauthorizedError") {
    httpError = new HttpError({
      message: err.message,
      code: 401,
    });
  } else {
    httpError = new HttpError({
      message: err.message,
    });
  }

  if (process.env.NODE_ENV === "production" && httpError.code === 500) {
    delete httpError.message; // scrub internal error messages
  }

  res.status(httpError.code).json(httpError.serialize());
  next();
};
