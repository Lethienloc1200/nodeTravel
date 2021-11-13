import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import tourController from "../controllers/tourController";
import doctorController from "../controllers/doctorController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);

  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/post-infor-doctors", doctorController.postInforDoctors);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );

  router.get("/api/get-all-tours", tourController.handleGetAlltours);
  router.post("/api/create-new-tour", tourController.handleCreateNewTour);
  router.put("/api/edit-tour", tourController.handleEditTour);
  router.delete("/api/delete-tour", tourController.handleDeleteTour);

  router.get("/api/top-tour-home", tourController.getTopTourHome);
  router.get("/api/get-detail-tour-by-id", tourController.getDetailTourById);
  // router.get("/api/allcode", tourController.getAllCode);

  return app.use("/", router);
};

module.exports = initWebRoutes;
