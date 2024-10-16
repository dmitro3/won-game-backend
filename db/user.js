const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    telegramId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    points: {
        type: Number,
        default: 0,
    },
    pointsBalance: {
        type: Number,
        default: 0,
    },
    currentEnergy: {
        type: Number,
        default: 1000,
    },
    energyLimit: {
        type: Number,
        default: 1000,
    },
    levelIndex: {
        type: Number,
        default: 1,
    },
    tokens: {
        type: Number,
        default: 1000,
    },
    attackItems: {
        type: Number,
        default: 0,
    },
    defenceItems: {
        type: Number,
        default: 0,
    },
    lifeItems: {
        type: Number,
        default: 0,
    },
    tokensEarned: {
        type: Number,
        default: 0,
    },
    lastChallenge: {
        type: Number,
        default: 0,
    },
    lastLoginTimestamp: {
        type: Date,
        default: 0,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
