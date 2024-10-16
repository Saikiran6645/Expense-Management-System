const asyncHandler = require("express-async-handler");
const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userController = {
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    // const user = new User({ name, email, password });
    if (!username && !password && !email) {
      throw new Error("all fields are required");
    }
    const valid = await User.findOne({ email });
    // console.log(valid);
    if (valid) {
      throw new Error("user already exist");
    }
    const salt = await bcrypt.genSalt(10);
    const pass = password;
    const hashedPassword = await bcrypt.hash(pass, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(user);
    res.json(user);
  }),
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("invalid email");
    }
    console.log(user);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("invalid password");
    }
    const token = jwt.sign({ id: user._id }, "ramkey", {
      expiresIn: "30d",
    });
    res.json({
      message: "login success",
      token,
      user_id: user._id,
      user: user.username,
      email: email,
    });
  }),
  profile: asyncHandler(async (req, res) => {
    const id = req.user;
    console.log(req.user);
    const user = await User.findById(id);

    res.json({
      userName: user.username,
      userEmail: user.email,
    });
  }),
  changePassword: asyncHandler(async (req, res) => {
    const { password } = req.body;
    const user = await User.findById(req.user);
    const salt = await bcrypt.genSalt(10);
    const pass = password;
    const hashedPassword = await bcrypt.hash(pass, salt);
    user.password = hashedPassword;
    user.save({
      validateBeforeSave: false,
    });

    res.json({
      message: "successfully changed password",
    });
  }),
  updateProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user,
      {
        username,
        email,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "successfully updated user profile",
      username,
      email,
    });
  }),
};
module.exports = userController;
