const mongoose = require("mongoose");

//mongoDBとの接続「mongodb+srv://[ユーザーネーム]:[パスワード]@[クラスター名].~~~/[DB名]?~~~」
mongoose.connect(
  process.env.MONGO_DB_TABLE_PATH,
  { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true } //findAndmodifyメソッドは使いません、という指定。(findOneAndUpdateなどがあるため)
);
mongoose.connection.once("open", () => {
  console.log("db connected");
});

module.exports = mongoose;
