// User Controller manages user-related operations such as user authentication, registration, fetching user data, updating user profiles, and deleting user accounts.
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { mongoose } = require("mongoose");
const { User } = require("../models/userModel");
const bcrypt = require("bcryptjs");


// user result submit
const userSubmitResult = async (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $push: { quizResult: req.body },
    },
    { new: true }
  )
    .then((result) => {
      res.status(200).json({
        quizList_Updated: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server error", err });
    });
};

// fetch all user result
const getAllUsersResult = async (req, res) => {
  let usersArray = [];

  User.find()
    .then((result) => {
      result.forEach((user) => {
        let userObj = {
          firstName: user.firstName,
          lastName: user.lastName,
          quizResult: user.quizResult,
        };
        usersArray.push(userObj);
      });
      res.status(200).json({
        quizResult: usersArray,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server error", err });
    });
};
module.exports = {
  userSubmitResult,
  getAllUsersResult,
};
