import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    savedPhotos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }],
    likedPhotos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
