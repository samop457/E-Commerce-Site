const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Ensure name is mandatory
        trim: true, // Removes leading and trailing spaces
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true, // Ensures consistency
    },
    password: {
        type: String,
        required: true, // Ensure password is mandatory
    },
    profilePic: {
        type: String,
        default: '', // Provide a default value
    },
    role: {
        type: String,
        default: 'user', // Set default role
    },
}, {
    timestamps: true, // Adds `createdAt` and `updatedAt`
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
