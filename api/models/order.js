const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  uid: String,
  name: String,
  email: String,
  tel: String,
  address: String,
  zipcode: String,
  cardNo: String,
  orderDatetime: String,
  timestamp: Number,
  totalPrice: Number,
  payType: Number,
  status: Number,
  itemInfo: Array,
});

module.exports = mongoose.model("Order", OrderSchema);
