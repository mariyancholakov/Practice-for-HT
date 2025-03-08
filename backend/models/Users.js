const mongoose = require('mongoose');

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
    savedPhotos:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }],
    likedPhotos:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }]
},
    {
        timestamps: true
    })

module.exports = mongoose.model('User', userSchema)