const mongoose = require('mongoose');
const Milestone = require('../milestone');
require('dotenv').config();

const data = [
    { title: "Daily Login", imgSrc: "/assets/img/daily.png", reward: 20, isReceived: false, isFailed: true },
    { title: "100 Taps Click", imgSrc: "/assets/img/loader.webp", reward: 30, isReceived: false, isFailed: true },
];

let index = 0;

const clearSchema = (callback) => {
    Milestone.deleteMany().then (() => callback());
}

const migrate = () => {
    let milestone = new Milestone(data[index]);
    milestone.save().then((result) => {
        setTimeout(() => {
            index++;
            if (index < data.length) migrate();
        }, 100);
    });
}

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI).then(
    () => {
        console.log('MongoDB connected!');
        clearSchema(() => migrate());
    }
).catch(
    err => console.error('MongoDB connection error:', err)
);
