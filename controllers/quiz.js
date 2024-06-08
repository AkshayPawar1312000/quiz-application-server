// Quiz Controller handles the logic for managing quiz-related operations such as fetching, creating, updating, and deleting quizzes.

const { Quiz } = require("../models/quiz");

// get quiz
const getQuiz = async (req, res) => {
  const quizSub = req.params.quizSub;
  Quiz.findOne({ quizSub })
    .then((result) => {
      return res.status(200).json({
        quizData: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

// add quiz in DB
const addQuiz = async (req, res) => {
  const { quizSub } = req.body;

  try {
    const newQuiz = new Quiz({ quizSub, quiz: req.body.quiz });
    await newQuiz.save();

    res.status(201).json({ message: "Quiz successfully added" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



// add same quiz more questions
const addMoreQuizINSameList = async (req, res) => {
  Quiz.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $push: { quiz: req.body },
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



module.exports = {
  addQuiz,
  addMoreQuizINSameList,
  getQuiz
};
