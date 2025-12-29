const Goal = require("../models/Goal");

// CREATE GOAL
exports.createGoal = async (req, res) => {
  try {
    const userId = req.userId; // will come from JWT later
    const { title, category, reason } = req.body;

    // 1. basic validation (gentle)
    if (!title || !category || !reason) {
      return res.status(400).json({
        message: "Title, category, and reason are required",
      });
    }

    // 2. check active goal limit (max 3)
    const activeGoalsCount = await Goal.countDocuments({
      userId,
      isActive: true,
    });

    if (activeGoalsCount >= 3) {
      return res.status(400).json({
        message:
          "You can have up to 3 active goals at a time. Pause one to add another.",
      });
    }

    // 3. create goal
    const goal = await Goal.create({
      userId,
      title,
      category,
      reason,
    });

    // 4. respond calmly
    res.status(201).json({
      message: "Goal created successfully",
      goal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET USER GOALS
exports.getGoals = async (req, res) => {
  try {
    const userId = req.userId;

    const goals = await Goal.find({
      userId,
      isActive: true,
    }).sort({ createdAt: 1 }); // oldest first

    res.status(200).json({
      goals,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
