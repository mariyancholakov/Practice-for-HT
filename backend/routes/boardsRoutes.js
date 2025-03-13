import express from 'express';
import mongoose from "mongoose";
import { Board } from '../models/Boards.js';
const boardRouter = express.Router();


boardRouter.post('/', async (req, res) => {
    try {
        const newBoard = new Board(req.body);
        const savedBoard = await newBoard.save();
        res.status(201).json(savedBoard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

boardRouter.get('/', async (req, res) => {
    try {
        const boards = await Board.find();
        res.status(200).json(boards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

boardRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Board not found' });
    }
    try {
        const board = await Board.findById(id);
        if (!board) {
            return res.status(404).json({ success: false, message: 'Board not found' });
        }
        res.status(200).json(board);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

boardRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Board not found' });
    }
    try {
        await Board.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Board deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

boardRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Board not found' });
    }
    try {
        const updatedBoard = await Board.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedBoard);
    } catch (err) {
        res.status(500).json({ message: err.message });

    }
});

export default boardRouter;