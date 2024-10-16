const express = require("express");
const { userRoutes } = require("./routes/userRoutes");
const cors = require("cors");
const mongoose = require("mongoose");
const { errorHandler } = require("./Middlewares/ErrorHandler");
const { categoryRoute } = require("./routes/categoryRoute");
const { transactionRoute } = require("./routes/transactionRoute");

const app = express();
app.use(cors());
const PORT = 3000;
const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Expense_Tracker");
    console.log("Mongodb has been connected successfully");
  } catch (error) {
    console.log(`Error connecting to mongodb ${error}`);
  }
};
connectToDB();
app.use(express.json());
app.use("/", userRoutes);
app.use("/", categoryRoute);
app.use("/", transactionRoute);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
