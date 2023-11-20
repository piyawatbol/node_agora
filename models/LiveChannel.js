const mongoose = require("mongoose");

const LiveChannel = new mongoose.Schema({
    img_live: String,
    channel_name: String,
    // start_live: String,
    // close_live: String,
    live_status: Boolean,
},{timestamps : true});

module.exports = mongoose.model("LiveChannel", LiveChannel);

