const express = require("express");
const router = express.Router();
const LiveChannel = require("../../models/LiveChannel");
const auth = require("../../middleware/auth");

router.delete("/", auth, async (req, res) => {
    const id = req.body.id ;
  try {
    const data = await LiveChannel.findByIdAndDelete(id);
    if (!data) {
      return res.status(401).send("delete error");
    }
    res.status(201).send("delete sucesss");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
