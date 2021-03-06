import columnController from "../controllers/column";
import { validateSchema } from "../middleware/schema_validator";
import idParamValidator from "../middleware/id_param_validator";

export default (router) => {
  router.post(
    "/columns?",
    validateSchema("columnSchema"),
    columnController.create
  );
  router.get("/columns", columnController.select);
  router.get("/columns?/:id/cards", columnController.selectCards);
  router.get("/columns?/:id", idParamValidator, columnController.index);
  router.put(
    "/columns?/:id",
    idParamValidator,
    validateSchema("columnSchema"),
    columnController.update
  ); // see https://stackoverflow.com/a/34400076
  router.patch("/columns?/:id", idParamValidator, columnController.update);
  router.delete("/columns?/:id", idParamValidator, columnController.remove); // delete is a reserved name
};
