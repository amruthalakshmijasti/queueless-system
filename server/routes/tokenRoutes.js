const express = require("express");
const router = express.Router();
const Token = require("../models/Token");

// GET all tokens
router.get("/", async (req, res) => {
  const tokens = await Token.find();
  res.json(tokens);
});

// ADD token
router.post("/add", async (req, res) => {
  const count = await Token.countDocuments();

  const newToken = new Token({
    name: req.body.name,
    service: req.body.service,
    tokenNumber: count + 1
  });

  await newToken.save();
  res.send("Token added");
});

// MARK DONE
router.put("/:id", async (req, res) => {
  await Token.findByIdAndUpdate(req.params.id, {
    status: "done"
  });
  res.send("Updated");
});

// REMOVE token
router.delete("/:id", async (req, res) => {
  await Token.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;