import userController from "../controllers/user";
import user from "../models/user";

export default (router) => {
  router.post("/user", userController.create);
};
