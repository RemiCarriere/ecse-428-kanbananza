import boardController from "../controllers/board";
import { validateSchema } from "../middleware/schema_validator";

export default (router) => {
  router.post("/board", validateSchema("createBoard"), boardController.create);
  router.get("/boards", boardController.select);
  router.get("/board/:id", boardController.index);
  router.get("/board/:id/columns", boardController.selectColumns);
};
