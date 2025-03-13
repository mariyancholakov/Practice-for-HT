import express from 'express';
import mongoose from 'mongoose';
import { Post } from '../models/Posts.js';
const postRouter = express.Router();

postRouter.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json({
            success: true,
            data: posts
        });
    } catch (error) {
        return res.status(500).send("Server Error");
    }
});

postRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        return res.status(200).json({
            success: true,
            data: post
        });
    } catch (error) {
        return res.status(500).send("Server Error");
    }
});

postRouter.get('/posts/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const posts = await Post.find({ name: name });
        if (!posts) {
            return res.status(404).json({ success: false, message: "No posts found" });
        }
        return res.status(200).json({
            success: true,
            data: posts
        });
    } catch (error) {
        return res.status(500).send("Server Error");
    }
});

postRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }
    try {
        if (!req.body.name || !req.body.imageURL) {
            return res.status(400).send('Fill at least name and image URL');
        }
        const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({
            success: true,
            data: post
        });
    } catch (error) {
        return res.status(500).send("Server Error");
    }
});

postRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }
    try {
        await Post.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });
    } catch (error) {
        return res.status(500).send("Server Error");
    }
});

postRouter.post('/', async (req, res) => {
    try {
        if (!req.body.name || !req.body.imageURL) {
            return res.status(400).send('You need to enter both name and image');
        }
        const newPost = {
            name: req.body.name,
            imageURL: req.body.imageURL
        };
        const post = await Post.create(newPost);
        return res.status(201).send(post);
    } catch (error) {
        return res.status(500).send("Server Error");
    }
});

export default postRouter;
