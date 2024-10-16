const asyncHandler = require("express-async-handler");
const Category = require("../Model/Categories");
const Transactions = require("../Model/Transactions");
const categoryController = {
  createCategory: asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    if (!name || !type) {
      res.status(400);
      throw new Error("Please fill all fields");
    }
    const valid = ["income", "expense"];
    if (!valid.includes(type)) {
      res.status(400);
      throw new Error("Please enter valid type");
    }
    const normalizedName = name.toLowerCase();
    const categoryExists = await Category.findOne({
      name: normalizedName,
      user: req.user,
    });
    if (categoryExists) {
      throw res.status(400).json({ message: "Category already exists" });
    }
    const category = await Category.create({
      name: normalizedName,
      type,
      user: req.user,
    });
    res.status(201).json(category);
  }),
  getCategories: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user });
    res.json(categories);
  }),
  update: asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(400);
      throw new Error("Category not found");
    }
    const oldCategory = category.name;
    category.name = name || category.name;
    category.type = type || category.type;
    const updatedCategory = await category.save();
    if (oldCategory !== name) {
      const transaction = await Transactions.updateMany(
        { user: req.user, category: oldCategory },
        {
          $set: { category: name },
        }
      );
    }
    res.json(updatedCategory);
  }),
  delete: asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(400);
      throw new Error("Category not found");
    }
    const transactions = await Transactions.updateMany(
      { user: req.user, category: category.name },
      {
        $set: { category: "uncategorized" },
      }
    );
    await Category.findByIdAndDelete(categoryId);
    res.json({ message: "Category deleted" });
  }),
};
module.exports = categoryController;
