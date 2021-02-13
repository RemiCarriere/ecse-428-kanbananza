import userController from "../controllers/user";

export default (router) => {
  router.post("/user", userController.create);
};
