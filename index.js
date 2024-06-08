const cookieParser = require('cookie-parser')
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//config.env path
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const { userRoute } = require("./routes/UserRoute");
const { quizRoute } = require("./routes/qiuzRoute");

// add cors
app.use(cors());
app.use(cookieParser());

//Secure DB
const DB = process.env.DATABASE;
const PORT = process.env.PORT;

// DB Connection
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((error) => console.log(error));

app.use(express.json());

//for user routes
app.use("/", userRoute);
//for quiz routes
app.use("/", quizRoute);

app.listen(PORT, function () {
  console.log(`Server is running at ${PORT}`);
});

module.exports = app;
