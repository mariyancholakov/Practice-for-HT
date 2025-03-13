import User from "../models/Users.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
const router = express.Router()

//register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    const existingUser = User.findOne({ email })
    if (existingUser){
        return res.status(400).json({ message: 'User already exists' })
    }
    const hashedPassword = bcryptjs.hash(password, 10)
    try{
        const user = new User({ username, email, hashedPassword })
        await user.save()
        return res.status(200).json({ message: 'User registered successfully!' })
    }
    catch(error){
        console.error(error)
        return res.status(500).json({ message: 'Server error' })
    }
})

//login
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const existingUser = User.findOne({ email })
    if (!existingUser){
        return res.status(400).json({ message: 'User not found' })
    }
    const isMatch = await bcryptjs.compare(password, existingUser.hashedPassword)
    if (!isMatch){
        return res.status(400).json({ message: 'Invalid password' })
    }
    const token = jwt.sign({ userId: existingUser._id }, 'JWT_SECRET', { expiresIn: '1h' })
    res.json({ token })
})


export default router