const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/Users.js");
const router = express.Router();

//register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = bcryptjs.hash(password, 10);
  try {
    const user = new User({ username, email, hashedPassword });
    await user.save();
    return res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }
  const isMatch = await bcryptjs.compare(password, existingUser.hashedPassword);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = jwt.sign({ userId: existingUser._id }, "JWT_SECRET", {
    expiresIn: "1h",
  });
  res.json({ token });
});

//profile
router.get("/profile", async (req, res) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      const user = await User.findById(decode?.id);
      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid token" });
      }
      const userData = {
        id: user?._id,
        username: user?.username,
        email: user?.email,
      };
      return res
        .status(201)
        .json({ status: true, message: "Profile data", data: userData });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
