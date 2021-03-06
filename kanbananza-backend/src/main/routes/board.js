import boardController from "../controllers/board";
import { validateSchema } from "../middleware/schema_validator";
import idParamValidator from "../middleware/id_param_validator";

export default (router) => {
  router.post(
    "/boards?",
    validateSchema("boardSchema"),
    boardController.create
  );
  router.get("/boards", boardController.select);
  router.get("/boards?/:id", idParamValidator, boardController.index);
  router.get(
    "/boards?/:id/columns",
    idParamValidator,
    boardController.selectColumns
  );
  router.delete("/boards?/:id", idParamValidator, boardController.remove);
};
