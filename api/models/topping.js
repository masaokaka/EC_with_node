const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ToppingSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  mprice: Number,
  lprice: Number,
});

module.exports = mongoose.model("Topping", ToppingSchema);
