import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
import postsRoutes from './routes/postsRoutes.js';
import boardsRoutes from './routes/boardsRoutes.js';
import savePostBoard from './routes/savePostBoard.js';
import { connectDB } from './config/db.js';
import path from 'path';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth/', authRoutes);
app.use('/api/posts/', postsRoutes);
app.use('/api/boards/', boardsRoutes);
app.use('/api/saved/', savePostBoard);
app.use('/uploads', express.static(path.resolve('uploads')));

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('Error connecting to database:', error.message);
});