const express = require("express");
const userController = require("../Controller/userController");
const userAuth = require("../Middlewares/authentication");
// const { errorHandler } = require("../Controller/errorHandler");
const userRoutes = express.Router();
userRoutes.post("/api/v1/user/register", userController.register);
userRoutes.post("/api/v1/user/login", userController.login);
userRoutes.get("/api/v1/user/profile", userAuth, userController.profile);
userRoutes.put(
  "/api/v1/user/updateProfile",
  userAuth,
  userController.updateProfile
);
userRoutes.put(
  "/api/v1/user/changepassword",
  userAuth,
  userController.changePassword
);

module.exports = { userRoutes };
