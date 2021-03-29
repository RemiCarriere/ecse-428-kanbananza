import boardController from "../controllers/board";
import { validateSchema } from "../middleware/schema_validator";
import idParamValidator from "../middleware/id_param_validator";

export default (router) => {
  router.post(
    "/boards?",
    validateSchema("completeBoard"),
    boardController.create
  );
  router.get("/boards", boardController.select);
  router.get("/boards?/:id", idParamValidator, boardController.index);
  router.get(
    "/boards?/:id/columns",
    idParamValidator,
    boardController.selectColumns
  );
  router.put(
    "/boards?/:id",
    idParamValidator,
    validateSchema("completeBoard"),
    boardController.update
  );
  router.patch(
    "/boards?/:id",
    idParamValidator,
    validateSchema("partialBoard"),
    boardController.update
  );
  router.delete("/boards?/:id", idParamValidator, boardController.remove);
};
