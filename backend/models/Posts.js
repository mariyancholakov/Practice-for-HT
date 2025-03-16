import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        imageURL: {
            type: String,
            required: true
        },
        tags: {
            type: [String],
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model("Post", postSchema);

export { Post };