import HttpError from "../http_error";

export default (err, req, res, next) => {
  // console.error(err.stack);
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

  res.status(httpError.code).json(httpError.serialize());
  next();
};
