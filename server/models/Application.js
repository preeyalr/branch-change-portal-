const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true
  },
  currentBranch: String,
  cgpa: Number,

  // ✅ NEW FIELDS
  category: String,
  previouslyAllotted: String,
  allocatedCategory: String, // 🔥 to track which seat category was used for allocation
  preferences: [String],

  allottedBranch: {
    type: String,
    default: null
  },

  status: {
    type: String,
    default: "pending"
  }

});

module.exports = mongoose.model("Application", applicationSchema);