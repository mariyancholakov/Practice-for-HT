import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    savedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    savedBoards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }]
})

const User = mongoose.model('User', userSchema)
export { User as default }