import cardController from "../controllers/card";
import { validateSchema } from "../middleware/schema_validator";
import idParamValidator from "../middleware/id_param_validator";

export default (router) => {
  router.post("/cards?", validateSchema("cardSchema"), cardController.create);
  router.get("/cards", idParamValidator, cardController.select);
  router.get("/cards?/:id", idParamValidator, cardController.index);
  router.put(
    "/cards?/:id",
    idParamValidator,
    validateSchema("cardSchema"),
    cardController.update
  ); // see https://stackoverflow.com/a/34400076
  router.patch("/cards?/:id", idParamValidator, cardController.update);
};
