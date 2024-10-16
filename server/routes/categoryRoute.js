const express = require("express");

const userAuth = require("../Middlewares/authentication");
const categoryController = require("../Controller/categoryController");

const categoryRoute = express.Router();
categoryRoute.post(
  "/api/v1/category/create",
  userAuth,
  categoryController.createCategory
);
categoryRoute.get(
  "/api/v1/category/get",
  userAuth,
  categoryController.getCategories
);
categoryRoute.put(
  "/api/v1/category/update/:id",
  userAuth,
  categoryController.update
);
categoryRoute.delete(
  "/api/v1/category/delete/:id",
  userAuth,
  categoryController.delete
);

module.exports = { categoryRoute };
