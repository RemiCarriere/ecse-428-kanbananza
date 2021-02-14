import basicAuth from "express-basic-auth";
import auth from "../auth";
import userController from "../controllers/user";
import { validateSchema } from "../middleware/schema_validator";

export default (router) => {
  router.post("/user", validateSchema("createUser"), userController.create);
  router.get(
    "/user",
    basicAuth({ authorizer: auth.authAll }),
    userController.findByEmail
  );
  router.get(
    "/login",
    basicAuth({ authorizer: auth.authAll }),
    userController.login
  );
};
