const express = require("express");

const userAuth = require("../Middlewares/authentication");
const transactionController = require("../Controller/transactionController");

const transactionRoute = express.Router();
transactionRoute.post(
  "/api/v1/transaction/create",
  userAuth,
  transactionController.createTransaction
);
transactionRoute.get(
  "/api/v1/transaction/get",
  userAuth,
  transactionController.getTransactions
);
transactionRoute.get(
  "/api/v1/transaction/filter",
  userAuth,
  transactionController.filter
);
transactionRoute.put(
  "/api/v1/transaction/update/:id",
  userAuth,
  transactionController.update
);
transactionRoute.delete(
  "/api/v1/transaction/delete/:id",
  userAuth,
  transactionController.delete
);

module.exports = { transactionRoute };
