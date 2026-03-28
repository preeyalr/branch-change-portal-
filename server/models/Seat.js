const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  branch: String,
  seats: {
    General: Number,
    OBC: Number,
    SC: Number,
    ST: Number
  }
});

module.exports = mongoose.model("Seat", seatSchema);