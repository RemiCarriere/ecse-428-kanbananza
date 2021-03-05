import cardController from "../controllers/card";
import { validateSchema } from "../middleware/schema_validator";
import idParamValidator from "../middleware/id_param_validator";

export default (router) => {
  router.post("/card", validateSchema("cardSchema"), cardController.create);
  router.get("/cards", cardController.select);
  router.get("/card/:id", idParamValidator, cardController.index);
};
