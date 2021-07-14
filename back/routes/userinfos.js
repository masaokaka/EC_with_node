var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const UserInfo = require("../models/userinfo");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("this is userinfos");
});

router.post("/get-userinfo", (req, res) => {
  console.log(req.body.uid);
  const uid = req.body.uid;
  UserInfo.findOne({ uid: uid }).then((userinfo) => {
    console.log(userinfo);
    res.send(userinfo);
  });
});

router.post("/add-userinfo", (req, res) => {
  console.log(req.body);
  const new_userinfo = {
    ...req.body,
    _id: mongoose.Types.ObjectId(),
  };
  const newUserInfo = new UserInfo(new_userinfo);
  newUserInfo.save().then((userinfo) => {
    console.log(userinfo);
    res.send(userinfo);
  });
});

module.exports = router;
