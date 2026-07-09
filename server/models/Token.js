const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  name: String,
  service: String,
  tokenNumber: Number,
  status: {
    type: String,
    default: "waiting"
  }
});

module.exports = mongoose.model("Token", tokenSchema);