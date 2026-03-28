const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ✅ STEP 1: create app FIRST
const app = express();

// ✅ STEP 2: import routes
const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/Application");
const adminRoutes = require("./routes/admin");

// ✅ STEP 3: middleware
app.use(cors());
app.use(express.json());

// ✅ test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ STEP 4: routes
app.use("/api/auth", authRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/admin", adminRoutes);

// ✅ STEP 5: connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => console.log(err));