const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

const auth = async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      const verifyUser = jwt.verify(token, process.env.SECURE_KEY);
      console.log(verifyUser, "verify token")
      next()
    } catch (err) {
      res.status(401).send(err);
    }
  };
module.exports = auth

