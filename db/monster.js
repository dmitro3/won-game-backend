const mongoose = require('mongoose');

const monsterSchema = new mongoose.Schema({
    levelIndex: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    avatarIndex: {
        type: Number,
        default: 1,
    },
    energyLimit: {
        type: Number,
        default: 1000,
    },
    attack: {
        type: Number,
        default: 0,
    },
    defense: {
        type: Number,
        default: 0,
    },
    tokenEarns: {
        type: Number,
        default: 0,
    },
    tokenSpend: {
        type: Number,
        default: 0,
    },
});

const Monster = mongoose.model('Monster', monsterSchema);

module.exports = Monster;
