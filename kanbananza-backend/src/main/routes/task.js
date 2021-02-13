import taskController from "../controllers/task";

export default (router) => {
  router.get("/tasks?", (req, res) =>
    res.status(200).json({ message: "task resource endpoint" })
  );

  router.get("/task/:id", taskController.index);
};
