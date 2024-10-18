const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    telegramId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    tapLimit: {
        type: Number,
        default: 100,
    },
    continueDate: {
        type: Number,
        default: 0,
    },
    isDailyReceived: {
        type: Boolean,
        default: false,
    },
    isDTapReceived: {
        type: Boolean,
        default: false,
    },
    lastTappedTime: {
        type: Date,
        default: 0,
    },
    lastLoginTime: {
        type: Date,
        default: 0,
    },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
