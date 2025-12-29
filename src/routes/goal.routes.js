const express = require("express");
const {
  createGoal,
  getGoals,
} = require("../controllers/goal.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, createGoal);
router.get("/", authMiddleware, getGoals);

module.exports = router;
