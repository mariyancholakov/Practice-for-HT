const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const ConnectDB = require("./config/db.js");
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
