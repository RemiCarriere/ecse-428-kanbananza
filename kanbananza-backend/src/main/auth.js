import basicAuth from "express-basic-auth";
import HttpError from "./http_error";

function authAll() {
  return true;
}

function authorizer(req, user) {
  const userMatches = basicAuth.safeCompare(req.auth.user, user.email);
  const passwordMatches = basicAuth.safeCompare(
    req.auth.password,
    user.password
  );
  if (!passwordMatches || !userMatches) {
    throw new HttpError({
      code: 401,
      message: "You are not authorized to view this content",
    });
  }
}
export default { authorizer, authAll };
