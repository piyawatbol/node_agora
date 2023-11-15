const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  uid: String,
  first_name: String,
  last_name: String,
  phone: String,
  email: String,
  password: String,
  user_img: String,
  login_type: String,
  role: String,
  token: String,
},{timestamps : true});

module.exports = mongoose.model("User", UsersSchema);

