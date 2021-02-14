import columnController from "../controllers/column";

export default (router) => {
  router.post("/column", columnController.create);
};
