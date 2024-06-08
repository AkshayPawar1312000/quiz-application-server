// Quiz routes define the endpoints and handle requests related to quizzes, including fetching, creating, updating, and deleting quizzes.

const express = require("express");
const app = express.Router();
const quizController = require("../controllers/quiz");
const { Quiz } = require("../models/quiz");

const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


// (Add quiz in mongodb)
app.post("/addQuiz", (req, res) =>
    quizController.addQuiz(req, res)
  
);

app.get("/quiz/:quizSub", (req, res) =>
    quizController.getQuiz(req,res)
);

app.post("/addQuiz/:id",(req,res)=>{
    quizController.addMoreQuizINSameList(req,res)
})

module.exports = { quizRoute: app };
