// Quiz model defines the structure and behavior of quiz data, including fields like questions

const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  quizSub: { type: Number, required: true },
  quiz: [
    {
      question: { type: String },
      option1: { type: String },
      option2: { type: String },
      option3: { type: String },
      option4: { type: String },
      correctAns: { type: String },
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = { Quiz };


