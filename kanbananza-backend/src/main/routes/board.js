import boardController from "../controllers/board";

export default (router) => {
  router.get("/boards?", (req, res) =>
    res.status(200).json({ message: "board resource endpoint" })
  );

  router.get("/board/:id", boardController.index);
};
