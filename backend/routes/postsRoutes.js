import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { Post } from '../models/Posts.js';
import path from 'path';
import fs from 'fs';

const postRouter = express.Router();

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

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

postRouter.get('/search/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const posts = await Post.find({ name: { $regex: name, $options: 'i' } });

        if (posts.length === 0) {
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

postRouter.post('/', upload.single('file'), async (req, res) => {
    try {
        if (!req.body.name || !req.file) {
            return res.status(400).json({ success: false, message: 'You need to enter both name and an image file' });
        }

        const newPost = new Post({
            name: req.body.name,
            description: req.body.description || '',
            tags: req.body.tags ? req.body.tags.split(',') : [],
            imageURL: `/uploads/${req.file.filename}`
        });

        const post = await newPost.save();
        return res.status(201).json({ success: true, data: post });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});

postRouter.put('/:id', upload.single('file'), async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.imageURL = `/uploads/${req.file.filename}`;
        }

        const post = await Post.findByIdAndUpdate(id, updateData, { new: true });
        return res.status(200).json({
            success: true,
            data: post
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});

postRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        if (post.imageURL) {
            const filePath = path.join(__dirname, '..', post.imageURL);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await Post.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});

export default postRouter;