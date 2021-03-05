import auth from "../auth";
import userController from "../controllers/user";
import idParamValidator from "../middleware/id_param_validator";
import { validateSchema } from "../middleware/schema_validator";

export default (router) => {
  router.post("/user", validateSchema("createUser"), userController.create);
  router.get("/user/email/:email", userController.indexOnEmail); // see https://stackoverflow.com/a/20386425
  router.get("/user/:id", idParamValidator, userController.index);
  router.get("/user/:id/boards", idParamValidator, userController.selectBoards);
  router.get("/users", userController.select);

  router.post("/login", auth.optional, userController.login);
  router.get("/login", auth.required, userController.checkToken);
};
