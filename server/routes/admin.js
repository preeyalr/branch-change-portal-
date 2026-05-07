const express = require("express");
const router = express.Router();

const Application = require("../models/Application");
const Seat = require("../models/Seat");
const User = require("../models/User");

const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");


// ✅ PROTECTED ROUTES (use cookies automatically)

router.get("/seats", authMiddleware, async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔥 ONLY ADMIN SHOULD RUN ALLOCATION
router.post("/allocate", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({ status: "pending" })
      .sort({ cgpa: -1 });

    let hasError = false;

    for (let app of applications) {
      try {
        let allocated = false;

        for (let branch of app.preferences) {
          const seat = await Seat.findOne({ branch });
          if (!seat) continue;

          const category = app.category;

          const categoriesToCheck =
            category === "General" ? ["General"] : [category, "General"];

          for (let cat of categoriesToCheck) {
            if (seat.seats[cat] && seat.seats[cat] > 0) {

              // ✅ allocate new seat
              app.status = "approved";
              app.allottedBranch = branch;
              app.allocatedCategory = cat;

              seat.seats[cat] -= 1;

              const user = await User.findById(app.studentId);

              if (!user) {
                console.log("❌ User not found:", app.studentId);
                continue;
              }

              // 🔥 FREE OLD SEAT (ONLY ONCE)
              if (user.currentBranch && user.currentBranch !== branch) {

                const oldSeat = await Seat.findOne({
                  branch: user.currentBranch
                });

                if (oldSeat && user) {

                  const prevCategory = user.allocatedCategory || user.category;

                  console.log("DEBUG:", {
                    userId: user._id,
                    oldBranch: user.currentBranch,
                    prevCategory
                  });

                  if (
                    prevCategory &&
                    oldSeat.seats &&
                    oldSeat.seats[prevCategory] !== undefined
                  ) {
                    oldSeat.seats[prevCategory] += 1;
                    await oldSeat.save();
                  } else {
                    console.log("❌ Invalid prevCategory:", prevCategory);
                  }
                }
              }
                // 🔥 update user AFTER freeing seat
                user.currentBranch = branch;
                user.allocatedCategory = cat;
                await user.save();

                await seat.save();
                await app.save();

                allocated = true;
                break;
              }
            }

            if (allocated) break;
          }

          if (!allocated) {
            app.status = "rejected";
            await app.save();
          }

        } catch (err) {
          console.log("❌ ERROR IN APPLICATION:", app._id, err.message);
          hasError = true;
        }
      }

    if (hasError) {
        return res.status(500).json({
          message: "Allocation completed with errors ❌"
        });
      }

      res.json({ message: "Allocation completed 🎯" });

    } catch (err) {
      console.log("SERVER ERROR:", err);
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
});


router.post("/seat", async (req, res) => {
  try {
    const { branch, category, count } = req.body;

    let seat = await Seat.findOne({ branch });

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

    seat.seats[category] += Number(count);

    await seat.save();

    res.json({ message: "Seats updated ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;