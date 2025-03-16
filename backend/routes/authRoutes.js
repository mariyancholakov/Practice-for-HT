import User from "../models/Users.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { Post } from "../models/Posts.js";
import { Board } from "../models/Boards.js";
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

//Saving posts and boards to an existing user
//posts
router.put('/:userId/saved_posts', async (req, res) => {
    try {
        const { userId } = req.params;
        const { postId } = req.body;

        if (!postId) {
            return res.status(400).json({ success: false, message: "Post ID is required in request body" });
        }

        const [user, post] = await Promise.all([
            User.findById(userId),
            Post.findById(postId)
        ]);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId, savedPosts: { $ne: postId } },
            { $addToSet: { savedPosts: postId } },
            { new: true }
        );

        if (updatedUser) {
            return res.status(200).json({ success: true, message: "Post saved successfully", savedPosts: updatedUser.savedPosts });
        } else {
            return res.status(400).json({ success: false, message: "Post already saved or user not found" });
        }
    } catch (error) {
        console.error("Error saving post:", error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});
//boards
router.put('/:userId/saved_boards', async (req, res) => {
    try {
        const { userId } = req.params;
        const { boardId } = req.body;

        if (!boardId) {
            return res.status(400).json({ success: false, message: "Board ID is required in request body" });
        }

        const [user, board] = await Promise.all([
            User.findById(userId),
            Board.findById(boardId)
        ]);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!board) {
            return res.status(404).json({ success: false, message: "Board not found" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId, savedBoards: { $ne: boardId } },
            { $addToSet: { savedBoards: boardId } },
            { new: true }
        );

        if (updatedUser) {
            return res.status(200).json({ success: true, message: "Board saved successfully", savedBoards: updatedUser.savedBoards });
        } else {
            return res.status(400).json({ success: false, message: "Board already saved or user not found" });
        }
    } catch (error) {
        console.error("Error saving board:", error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

export default router