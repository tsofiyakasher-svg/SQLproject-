var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var connection = require("./db/connection");
// var create = require("./scripts/createTables");

var userRouter = require("./routes/user.routs");
var todoRouter = require("./routes/todo.routs");
var postRouter = require("./routes/post.routs");
var signUpRouter = require("./routes/signUp.routs");
var loginRouter = require("./routes/login.routs");
var commentRouter = require("./routes/comment.routs");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);
app.use("/todo", todoRouter);
app.use("/post", postRouter);
app.use("/signUp", signUpRouter);
app.use("/login", loginRouter);
app.use("/comment", commentRouter);

module.exports = app;
