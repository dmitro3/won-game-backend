const mongoose = require('mongoose');

const s_ItemSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    type: {
        type: String,
        required: true,
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
    isBuy : {
        type: Boolean,
        required: true,
    }
});

const Shop = mongoose.model('Shop', s_ItemSchema);

module.exports = Shop;
