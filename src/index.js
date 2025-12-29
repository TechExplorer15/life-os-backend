require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// load models
require("./models/User");
require("./models/Goal");
require("./models/Habit");
require("./models/HabitLog");


// routes
const authRoutes = require("./routes/auth.routes");
const goalRoutes = require("./routes/goal.routes");


const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);


app.get("/", (req, res) => {
  res.send("Life OS backend is running");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
