const express = require("express");
const router = express.Router();

const Application = require("../models/Application");
const authMiddleware = require("../middleware/auth");

// =========================
// 📄 APPLY FOR BRANCH CHANGE
// =========================
router.post("/apply", authMiddleware, async (req, res) => {
  try {
    if (req.body.cgpa < 7) {
      return res.status(400).json({
        message: "CGPA must be at least 7"
      });
    }
    const studentId = req.user.id;

    const existing = await Application.findOne({ studentId });

    if (existing) {
      return res.status(400).json({
        message: "You have already applied"
      });
    }

    const app = new Application({
      ...req.body,
      studentId
    });

    await app.save();

    res.json({ message: "Application submitted ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// 📄 GET APPLICATION STATUS
// =========================
router.get("/status", authMiddleware, async (req, res) => {
  try {
    const studentId = req.user.id;

    const app = await Application.findOne({ studentId });

    res.json(app); // can be null if not applied

  } catch (err) {
    console.log("Status Error:", err);
    res.status(500).json({ error: err.message });
  }
});


// =========================
// 🚀 EXPORT ROUTER
// =========================
module.exports = router;