import userController from "../controllers/user";
import { validateSchema } from "../middleware/schema_validator";

export default (router) => {
  router.post("/user", validateSchema("createUser"), userController.create);
};
