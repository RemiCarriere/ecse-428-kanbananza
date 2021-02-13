import boardController from "../controllers/board";

export default (router) => {
  router.post("/board", boardController.create);
};
