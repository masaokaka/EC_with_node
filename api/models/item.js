const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  text: String,
  mprice: Number,
  lprice: Number,
  img: String,
});

module.exports = mongoose.model("Item", ItemSchema);
