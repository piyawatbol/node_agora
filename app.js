require("dotenv").config();
require("./config/database").connect();
var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var cors = require("cors");
app.use(cors());
app.use(logger("dev"));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", require("./routes/test.js"));

// users
app.use("/get_user", require("./routes/users/get_user.js"));


//login
app.use("/login", require("./routes/login/login.js"));
//register 
app.use("/register", require("./routes/register/register.js"));
//live

app.use("/add_live",require("./routes/live/add_live.js"))
app.use("/get_live",require("./routes/live/get_live.js"))
app.use("/delete_live",require("./routes/live/delete_live.js"))

//path image
app.use("/image",express.static(path.join(__dirname,'images')))

app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
