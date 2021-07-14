var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const { generateUploadUrl } = require("../config/aws_s3"); //s3.jsファイルの読み込み
const Item = require("../models/item");

//商品取得処理
router.get("/fetch-all-items", (req, res) => {
  Item.find({}).then((items) => {
    console.log(items);
    res.send(items);
  });
});

//画像ファイル登録用の一時的なURLをAWS S3から取得
router.get("/get-s3-url", async (req, res) => {
  const url = await generateUploadUrl();
  res.send({ url });
});
//商品追加処理
router.post("/add-item", async (req, res) => {
  console.log(req.body);
  const new_item = {
    ...req.body,
    _id: mongoose.Types.ObjectId(),
  };
  const newItem = new Item(new_item);
  newItem.save().then((item) => {
    console.log(item);
    res.send(item);
  });
});

//商品削除処理
router.post("/delete-item", (req, res) => {
  console.log(req.body._id);
  const _id = req.body._id;
  Item.findByIdAndDelete(_id).then((deletedItem) => {
    res.send({ deletedItem });
  });
});

module.exports = router;
