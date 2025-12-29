const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    preferences: {
      energyBaseline: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
      },

      dailyFocusTimeLimit: {
        type: Number,
        default: 30, // minutes
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
