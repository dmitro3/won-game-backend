const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
    levelIndex: {
        type: Number,
        required: true,
        unique: true,
        default: 1,
    },
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    tapBalanceRequired: {
        type: Number,
        required: true,
    },
    energy: {
        type: Number,
        required: true,
    },
    tapLimit: {
        type: Number,
        default: 0,
    },
    tapSpeed: {
        type: Number,
        default: 0,
    },
});

const Level = mongoose.model('Level', levelSchema);

module.exports = Level;
