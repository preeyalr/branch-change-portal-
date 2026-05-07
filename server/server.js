const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // 🔥 ADD THIS
require("dotenv").config();

const app = express();

// ✅ routes
const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/Application");
const adminRoutes = require("./routes/admin");

// 🔥 CORS (IMPORTANT FOR COOKIES)
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true               // 🔥 allow cookies
}));

// 🔥 middleware
app.use(express.json());
app.use(cookieParser()); // 🔥 ADD THIS

// ✅ test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ routes
app.use("/api/auth", authRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/admin", adminRoutes);

// ✅ DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => console.log(err));