import boardController from "../controllers/board";
import { validateSchema } from "../middleware/schema_validator";

export default (router) => {
  router.post("/board", validateSchema("createBoard"), boardController.create);
};
