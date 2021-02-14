import columnController from "../controllers/column";
import { validateSchema } from "../middleware/schema_validator";

export default (router) => {
  router.post(
    "/column",
    validateSchema("createColumn"),
    columnController.create
  );
};
