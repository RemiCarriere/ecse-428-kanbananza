import userController from "../controllers/user";

export default (router) => {
  router.get("/users?", (req, res) =>
    res.status(200).json({ message: "user resource endpoint" })
  );

  router.get("/user/:id", userController.index);
};
