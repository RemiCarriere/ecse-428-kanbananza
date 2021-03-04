import jwt from "express-jwt";
import config from "./config";

const jwtSecret = config.jwtSecret;

const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(" ")[0] === "Token") {
    return authorization.split(" ")[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: jwtSecret,
    algorithms: ["HS256"],
    userProperty: "payload",
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: jwtSecret,
    algorithms: ["HS256"],
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;
