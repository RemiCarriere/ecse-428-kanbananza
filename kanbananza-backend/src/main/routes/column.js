import columnController from "../controllers/column";
import { validateSchema } from "../middleware/schema_validator";
import idParamValidator from "../middleware/id_param_validator";

export default (router) => {
  router.post(
    "/column",
    validateSchema("columnSchema"),
    columnController.create
  );
  router.get("/columns", columnController.select);
  // router.get("/columns/:id/cards", columnController.selectCards);
  router.get("/column/:id", idParamValidator, columnController.index);
  router.put(
    "/column/:id",
    idParamValidator,
    validateSchema("columnSchema"),
    columnController.update
  ); // see https://stackoverflow.com/a/34400076
  router.patch("/column/:id", idParamValidator, columnController.update);
};
