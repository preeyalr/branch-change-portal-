const express = require("express");
const router = express.Router();

const Application = require("../models/Application");
const Seat = require("../models/Seat");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");

router.get("/seats",  async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/allocate", async (req, res) => {
  // allocation logic here

  try {
    // 1️⃣ Get all applications sorted by CGPA (highest first)
    const applications = await Application.find({ status: "pending" })
      .sort({ cgpa: -1 });

    for (let app of applications) {
      let allocated = false;

      // 2️⃣ Loop through preferences
      for (let branch of app.preferences) {

        const seat = await Seat.findOne({ branch });

        if (!seat) continue;

       const category = app.category;

// 🔥 category priority
let categoriesToCheck = [];

if (category === "General") {
  categoriesToCheck = ["General"];
} else {
  categoriesToCheck = [category, "General"];
}

// 🔍 check seats in order
for (let cat of categoriesToCheck) {

  if (seat.seats[cat] && seat.seats[cat] > 0) {

    // ✅ allocate
    app.status = "approved";
    app.allottedBranch = branch;
    app.allocatedCategory = cat; // 🔥 store actual seat used

    // 🔥 reduce seat
    seat.seats[cat] -= 1;

    // 🔥 free old seat
    const user = await User.findById(app.studentId);

    if (user && user.currentBranch && user.currentBranch !== branch) {

      const oldSeat = await Seat.findOne({
        branch: user.currentBranch
      });

      if (oldSeat) {
        // 🔥 free using correct category
        oldSeat.seats[user.allocatedCategory || user.category] += 1;
        await oldSeat.save();
      }

      user.currentBranch = branch;
      user.allocatedCategory = cat; // store new seat category
      await user.save();
    }

    await seat.save();
    await app.save();

    allocated = true;
    break;
  }
}

        // ❌ If no branch allocated
        if (!allocated) {
          app.status = "rejected";
          await app.save();
        }
      }
    }

    res.json({ message: "Allocation completed 🎯" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});



router.get("/applications", async (req, res) => {
  try {
    const apps = await Application.find()
      .populate("studentId", "name enrollmentNo");

    res.json(apps);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
);




router.post("/seat", async (req, res) => {
  try {
    const { branch, category, count } = req.body;

    let seat = await Seat.findOne({ branch });

    // if branch not exists → create new
    if (!seat) {
      seat = new Seat({
        branch,
        seats: {
          General: 0,
          OBC: 0,
          SC: 0,
          ST: 0
        }
      });
    }

    // update seat count
    seat.seats[category] += Number(count);

    await seat.save();

    res.json({ message: "Seats updated ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;