import basicAuth from "express-basic-auth";
import auth from "../auth";
import userController from "../controllers/user";
import idParamValidator from "../middleware/id_param_validator";
import { validateSchema } from "../middleware/schema_validator";

export default (router) => {
  router.post("/user", validateSchema("createUser"), userController.create);
  router.get("/user", userController.findByEmail);
  router.get("/user/:id", idParamValidator, userController.index);
  router.get("/user/:id/boards", idParamValidator, userController.selectBoards);
  router.get("/users/", userController.select);
  router.get(
    "/login",
    basicAuth({ authorizer: auth.authAll }),
    userController.login
  );
};
