import express from "express";

import userController from "../controllers/userController";
import tourController from "../controllers/tourController";
import commentController from "../controllers/commentController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);

  router.get("/api/get-all-tours", tourController.handleGetAlltours);
  router.post("/api/create-new-tour", tourController.handleCreateNewTour);
  router.put("/api/edit-tour", tourController.handleEditTour);
  router.delete("/api/delete-tour", tourController.handleDeleteTour);

  router.get("/api/top-tour-home", tourController.getTopTourHome);
  router.get("/api/get-detail-tour-by-id", tourController.getDetailTourById);

  router.get("/api/get-all-comments", commentController.handleGetAllComments);
  // router.post(
  //   "/api/create-new-comment",
  //   commentController.handleCreateNewComment
  // );

  // router.get("/api/allcode", tourController.getAllCode);

  router.post("/api/post-infor-comments", commentController.postInforComments);
  router.get(
    "/api/get-detail-comment-by-id",
    commentController.getDetailCommentById
  );

  return app.use("/", router);
};

module.exports = initWebRoutes;
