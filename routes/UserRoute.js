// User routes define the endpoints and handle requests related to users, including authentication, registration, fetching user data, updating user profiles, and deleting user accounts.

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express.Router();
const cors = require('cors');
const userController = require("../controllers/userController");
const { User } = require("../models/userModel");

const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const bcrypt = require("bcryptjs");
const { mongoose } = require("mongoose");

const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(cookieParser());

app.post("/userRegistration", async (req, res) =>
  // userController.registerUser(req, res)
  {
    try {
      const { email } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const saltRound = 10;
      const hash_password = await bcrypt.hash(req.body.password, saltRound);

      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName || "",
        lastName: req.body.lastName || " ",
        email: req.body.email,
        password: hash_password,
      });
      const newUser = await user.save();

      const token = await newUser.generateAuthToken();

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      });

      // const cookiesToken = req.cookies.jwt;
      // console.log(cookiesToken, "this is cooies");

      return res.send({
        message: newUser,
        success: true,
        token: token,
      });
    } catch (err) {
      console.error("Error:", err.message, "\n");
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
  }
);

app.post("/login", async (req, res) => {
  // userController.login(req,res)
  {
    try {
      const { email, password } = req.body;
      // Check if user exists
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Singin details" });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match status:", isMatch);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Singin details" });
      }

      // Generate authentication token
      const token = await user.generateAuthToken();

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      });

      // const cookiesToken = req.cookies.jwt;
      // console.log(cookiesToken, "this is cooies");
      // Send a successful response
      res
        .status(200)
        .json({ message: "User logged in successfully", user: user });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ message: "Server error", error });
    }
  }
});

app.post("/quizResult/:id", (req, res) => {
  userController.userSubmitResult(req, res);
});
app.get("/allUsersResult", (req, res) => {
  userController.getAllUsersResult(req, res);
});

module.exports = { userRoute: app };
