import auth from "../auth";
import userController from "../controllers/user";
import idParamValidator from "../middleware/id_param_validator";
import { validateSchema } from "../middleware/schema_validator";

export default (router) => {
  router.post("/user", validateSchema("createUser"), userController.create);
  router.get("/user", userController.findByEmail);
  router.get("/user/:id", idParamValidator, userController.index);
  router.get("/user/:id/boards", idParamValidator, userController.selectBoards);
  router.get("/users", userController.select);
  //POST login route (optional, everyone has access)
  router.post("/login", auth.optional, userController.login);

  //GET current route (required, only authenticated users have access)
  router.get("/current", auth.required, userController.checkToken);
};
