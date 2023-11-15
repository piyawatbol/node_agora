const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone, login_type } =
      req.body;
    encryptedPassword = await bcrypt.hash(password, 10);

    const check_email = await Users.findOne({
      email: email,
      login_type: login_type,
    });
    const check_phone = await Users.findOne({
      phone: phone,
      login_type: login_type,
    });
    // const check_id_card = await Users.findOne({id_card: id_card,login_type: login_type});

    if (check_email) {
      return res.status(401).send("Email has already been used");
    } else if (check_phone) {
      return res.status(401).send("Phone has already been used");
    }

    const allUser = await Users.find({});
    uid = allUser.length + 1;

    const user = await Users.create({
      uid,
      first_name,
      last_name,
      phone,
      email: email.toLowerCase(),
      password: encryptedPassword,
      user_img: "",
      role: "user",
      login_type: login_type,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "3d" }
    );
    user.token = token;
    res.status(201).json({ data: user });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
