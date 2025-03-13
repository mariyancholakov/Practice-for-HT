import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ConnectDB from "./config/db.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth/", authRoutes);
app.use("/api/users/", userRoutes);
ConnectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
