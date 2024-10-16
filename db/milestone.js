const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    imgSrc: {
        type: String,
    },
    reward: {
        type: Number,
        required: true,
    },
    isReceived: {
        type: Boolean,
    },
    isFailed: {
        type: Boolean
    }
});

const Milestone = mongoose.model('milestone', milestoneSchema);

module.exports = Milestone;
