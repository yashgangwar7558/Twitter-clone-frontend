const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const followingSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    followed_by_id: {
        type: String,
        required: true,
    },
    followed_id: {
        type: String,
        required: true,
    },
    followed_name: {
        type: String,
        required: true,
    },
    followed_handle: {
        type: String,
        required: true,
    },
    followed_pic: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const Following = new mongoose.model("Following", followingSchema);

module.exports = Following;