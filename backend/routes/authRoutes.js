const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/Users.js");
const router = express.Router();

//register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });

    return res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

   if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: existingUser._id }, "JWT_SECRET", {
      expiresIn: "1h",
    });
    return res.status(201).json({
      status: true,
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        password: existingUser.password,
        createdAt: existingUser.createdAt,
        updatedAt: existingUser.updatedAt,
      },
      token: token,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
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
