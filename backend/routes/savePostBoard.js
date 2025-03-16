import express from "express";
import { Post } from "../models/Posts.js";
import { Board } from "../models/Boards.js";
import User from "../models/Users.js";

const savePostBoard = express.Router();
savePostBoard.put('/:userId/saved_posts', async (req, res) => {
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
savePostBoard.put('/:userId/saved_boards', async (req, res) => {
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

export default savePostBoard;