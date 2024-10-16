const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    title: {
        type: String,
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
    price: {
        type: Number,
        default: 0,
    },
    imageSrc: {
        type: String,
    },
    isLock : {
        type: Boolean,
        required: true,
    }
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
