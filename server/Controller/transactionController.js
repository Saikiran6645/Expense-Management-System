const asyncHandler = require("express-async-handler");
const Transactions = require("../Model/Transactions");

const transactionController = {
  createTransaction: asyncHandler(async (req, res) => {
    if (!req.user) {
      res.status(500);
      throw new Error("Please login first");
    }
    const { amount, category, type, description, date } = req.body;
    if (!amount || !category || !type || !date) {
      res.status(400);
      throw new Error("Please fill all fields");
    }
    const valid = ["income", "expense"];
    if (!valid.includes(type)) {
      res.status(400);
      throw new Error("Please enter valid type");
    }
    const transaction = await Transactions.create({
      user: req.user,
      amount,
      category,
      type,
      date,
      description,
    });
    res.status(201).json(transaction);
  }),
  getTransactions: asyncHandler(async (req, res) => {
    if (!req.user) {
      res.status(500);
      throw new Error("Please login first");
    }
    const transactions = await Transactions.find({ user: req.user });
    res.status(200).json(transactions);
  }),
  filter: asyncHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;

    let filter = { user: req.user };
    console.log(filter);
    if (startDate && endDate) {
      filter.date = { $gte: startDate, $lte: endDate };
    }
    if (startDate) {
      filter.date = { $gte: startDate };
      console.log(filter.date);
    }

    if (endDate) {
      filter.date = { ...filter.date, $lte: endDate };
      console.log(filter.date);
    }
    if (type) {
      filter.type = type;
    }
    if (category) {
      if (category === "ALL") {
      } else if (category === "uncatagorized") {
        filter.category = "uncatagorized";
      } else {
        filter.category = category;
      }
    }
    console.log(filter);
    const transactions = await Transactions.find(filter);
    res.status(200).json(transactions);
  }),
  update: asyncHandler(async (req, res) => {
    const { amount, description, category, date, type } = req.body;
    const transaction = await Transactions.findById(req.params.id);
    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }
    transaction.amount = amount || transaction.amount;
    transaction.description = description || transaction.description;
    transaction.category = category || transaction.category;
    transaction.date = date || transaction.date;
    transaction.type = type || transaction.type;
    await transaction.save();
    res.status(200).json(transaction);
  }),
  delete: asyncHandler(async (req, res) => {
    const transaction = await Transactions.findById(req.params.id);
    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }
    if (transaction && transaction.user.toString() === req.user.toString()) {
      await Transactions.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Transaction removed" });
    } else {
      res.status(401);
      throw new Error("Unauthorized");
    }
  }),
};
module.exports = transactionController;
