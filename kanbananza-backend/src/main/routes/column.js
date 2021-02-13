import columnController from "../controllers/column";

export default (router) => {
  router.get("/columns?", (req, res) =>
    res.status(200).json({ message: "column resource endpoint" })
  );

  router.get("/column/:id", columnController.index);
};
