const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserInfoSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  uid: String,
  name: String,
  username: String,
  email: String,
  tel: String,
  address: String,
  zipcode: String,
});

module.exports = mongoose.model("UserInfo", UserInfoSchema);
