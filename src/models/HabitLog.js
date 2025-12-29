const mongoose = require("mongoose");

const habitLogSchema = new mongoose.Schema(
  {
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    timeSpent: {
      type: Number, // minutes
      min: 0,
    },

    count: {
      type: Number,
      min: 0,
    },

    didEngage: {
      type: Boolean,
    },

    effortLevel: {
      type: String,
      enum: ["low", "medium", "high"],
    },

    note: {
      type: String,
      trim: true,
    },

    source: {
      type: String,
      enum: ["timer", "manual"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HabitLog", habitLogSchema);
