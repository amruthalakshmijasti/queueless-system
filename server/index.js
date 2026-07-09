const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const tokenRoutes = require("./routes/tokenRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/queueDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/tokens", tokenRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend working!");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});