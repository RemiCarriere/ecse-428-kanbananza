import cardController from "../controllers/card";
import { validateSchema } from "../middleware/schema_validator";
import idParamValidator from "../middleware/id_param_validator";

export default (router) => {
  router.post("/card", validateSchema("createCard"), cardController.create);
  router.get("/columns", cardController.select);
  router.get("/column/:id", idParamValidator, cardController.index);
};
