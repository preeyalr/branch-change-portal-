const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  allocatedCategory: String, // 🔥 to track which seat category was used for allocation
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student"
  },
  enrollmentNo: {
    type: String,
    unique: true
  },
  password: String,
  currentBranch: String,
  cgpa: Number
});

module.exports = mongoose.model("User", userSchema);