const express = require("express");
const router = express.Router();
const LiveChannel = require("../../models/LiveChannel");
const multer = require("multer");
const path = require("path");
const auth = require("../../middleware/auth");

const storage = multer.diskStorage({
  destination: "./images/live_channel",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  const { channel_name } = req.body;
  console.log(channel_name)
  try {
    const data = await LiveChannel.create({
      channel_name: channel_name,
      img_live: req.file.filename,
      live_status: false,
    });

    if (!data) {
      return res.status(401).send({ data: "error add live channel" });
    }

    res.status(201).send({ data: data });
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;