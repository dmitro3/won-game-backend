const mongoose = require('mongoose');

const m_ItemSchema = new mongoose.Schema({
    telegramId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    type: {
        type: String,
        required: true,
    },
    energy: {
        type: Number,
        default: 0,
    },
    attack: {
        type: Number,
        default: 0,
    },
    defence: {
        type: Number,
        default: 0,
    },
    attribute: {
        type: Number,
        default: 0,
    },
    levelIndex: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        default: 0,
    },
    imageSrc: {
        type: String,
    },
    isWear: {
        type: Boolean,
    },
    lastPointsUpdateTimestamp: {
        type: Date,
        default: 0,
    },
    lastEnergyUpdateTimestamp: {
        type: Date,
        default: 0,
    },
});

const MineItem = mongoose.model('Mine', m_ItemSchema);

module.exports = MineItem;
