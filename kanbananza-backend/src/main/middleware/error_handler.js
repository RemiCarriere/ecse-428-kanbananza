import HttpError from "../http_error";

export default (err, req, res, next) => {
  console.log("Handling error");
  console.error(err.stack);
  let httpError;

  if (err instanceof HttpError) {
    httpError = err;
  } else {
    httpError = new HttpError({
      message: err.message,
    });
  }

  res.status(httpError.code).json(httpError.serialize());
  next();
};
