const express = require("express");
const router = express.Router();
const LiveChannel = require("../../models/LiveChannel");
const auth = require("../../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const data = await LiveChannel.find({});
    if (!data) {
      return res.status(401).send("Invalid email or password");
    }
    res.send({ data: data });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
