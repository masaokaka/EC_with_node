var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Topping = require("../models/topping");

//トッピング取得処理
router.get("/fetch-all-toppings", (req, res) => {
  Topping.find({}).then((items) => {
    console.log(items);
    res.send(items);
  });
});

//トッピング追加処理
router.post("/add-topping", async (req, res) => {
  console.log(req.body);
  const new_topping = {
    ...req.body,
    _id: mongoose.Types.ObjectId(),
  };
  const newTopping = new Topping(new_topping);
  newTopping.save().then((topping) => {
    console.log(topping);
    res.send(topping);
  });
});

//トッピング削除処理
router.post("/delete-topping", async (req, res) => {
  console.log(req.body._id);
  const _id = req.body._id;
  Topping.findByIdAndDelete(_id).then((deletedTopping) => {
    res.send({ deletedTopping });
  });
});

module.exports = router;
