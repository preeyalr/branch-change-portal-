const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authMiddleware = require("../middleware/auth");


// =========================
// 👤 GET PROFILE (SELF)
// =========================
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =========================
// 👤 GET PROFILE BY ID
// =========================
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =========================
// 📝 REGISTER
// =========================
router.post("/register", async (req, res) => {
  try {
    const { enrollmentNo, password } = req.body;

    const existingUser = await User.findOne({ enrollmentNo });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "Registered successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


// =========================
// 🔐 LOGIN (COOKIE BASED)
// =========================
router.post("/login", async (req, res) => {
  try {
    const { enrollmentNo, password } = req.body;

    const user = await User.findOne({ enrollmentNo });

    if (!user) {
      return res.status(400).json({
        message: "Invalid enrollment number"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password"
      });
    }

    // 🔥 IMPORTANT FIX HERE
    const token = jwt.sign(
      { id: user._id, role: user.role }, // ✅ ADD role
      "secretkey",
      { expiresIn: "1d" }
    );

    // 🔥 SET COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      secure: false // true in production
    });

    res.json({ message: "Login successful" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// =========================
// 🚪 LOGOUT
// =========================
router.post("/logout", (req, res) => {
  res.clearCookie("token");

  res.json({
    message: "Logged out successfully"
  });
});


module.exports = router;