import boardController from "../controllers/board";
import { validateSchema } from "../middleware/schema_validator";
import idParamValidator from "../middleware/id_param_validator";

export default (router) => {
  router.post("/board", validateSchema("createBoard"), boardController.create);
  router.get("/boards", boardController.select);
  router.get("/board/:id", idParamValidator, boardController.index);
  router.get(
    "/board/:id/columns",
    idParamValidator,
    boardController.selectColumns
  );
  router.delete("/board/:id", idParamValidator, boardController.remove);
};
