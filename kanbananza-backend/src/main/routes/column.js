import columnController from "../controllers/column";
import { validateSchema } from "../middleware/schema_validator";
import idParamValidator from "../middleware/id_param_validator";

export default (router) => {
  router.post(
    "/column",
    validateSchema("createColumn"),
    columnController.create
  );
  router.get("/columns", columnController.select);
  router.get("/columns/:id/cards", columnController.selectCards);
  router.get("/column/:id", idParamValidator, columnController.index);
};
