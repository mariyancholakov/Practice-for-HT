const express = require("express");
const User = require("../models/Users.js");
const mongoose = require("mongoose");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
//profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    console.log("Decoded user:", req.user);
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      status: true,
      message: "Profile data retrieved successfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
