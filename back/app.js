var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//dotenvライブラリ....envファイルに定義した値を環境変数として扱うことができる
const dotenv = require("dotenv");
dotenv.config();

require("./config/mongoDB"); //DB接続ファイルの読み込み

var indexRouter = require("./routes/index");
var userinfosRouter = require("./routes/userinfos");
var toppingsRouter = require("./routes/toppings");
var itemsRouter = require("./routes/items");
var ordersRouter = require("./routes/orders");

var app = express();
const cors = require("cors");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//cors対応
app.use(
  cors({
    origin: "http://localhost:3000", //ここをフロント側のURLに変更する
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/", indexRouter);
app.use("/userinfos", userinfosRouter);
app.use("/items", itemsRouter);
app.use("/toppings", toppingsRouter);
app.use("/orders", ordersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
