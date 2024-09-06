const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Endpoint to get all users
router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find({}, "_id firstName lastName isVerified"); 
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error, please try again later" });
  }
});

module.exports = router;
