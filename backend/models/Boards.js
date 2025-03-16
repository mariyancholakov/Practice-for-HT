import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imageURL: {
            type: String,
            required: true
        },
        posts: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Post',
            required: true,
            validate: [arrayLimit, 'At least two posts are required']
        }
    },
    {
        timestamps: true
    }
);

function arrayLimit(val) {
    return val.length >= 2;
}

const Board = mongoose.model("Board", boardSchema);

export { Board };