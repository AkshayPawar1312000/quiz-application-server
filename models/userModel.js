// User model defines the structure and behavior of user data, including fields like first name,last name , email, password, and additional profile information.

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  tokens: [
    {
      token: { type: String },
    },
  ],
  quizResult: [
    {
      quizName: { type: String },
      totalMark: { type: Number },
      yourMark: { type: Number },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECURE_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    res.send("the error part" + error);
    console.log("the error part" + error);
  }
};

const User = mongoose.model("allUser", userSchema);
module.exports = { User };
