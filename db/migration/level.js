const mongoose = require('mongoose');
const Level = require('../level');
require('dotenv').config();

const data = [
    { levelIndex: 1, title: 'Bronze', icon: '/assets/img/bronze.webp', tapBalanceRequired: 1000, energy: 1000, tapLimit: 100, tapSpeed: 1},
    { levelIndex: 2, title: 'Silver', icon: '/assets/img/silver.webp', tapBalanceRequired: 2000, energy: 2000, tapLimit: 200, tapSpeed: 2},
    { levelIndex: 3, title: 'Gold', icon: '/assets/img/gold.webp', tapBalanceRequired: 5000, energy: 5000, tapLimit: 500, tapSpeed: 5},
    { levelIndex: 4, title: 'Platinum', icon: '/assets/img/platinum.webp', tapBalanceRequired: 10000, energy: 10000, tapLimit: 1000, tapSpeed: 10},
    { levelIndex: 5, title: 'Diamond', icon: '/assets/img/diamond.webp', tapBalanceRequired: 25000, energy: 25000, tapLimit: 2500, tapSpeed: 25},
    { levelIndex: 6, title: 'Master', icon: '/assets/img/master.webp', tapBalanceRequired: 50000, energy: 50000, tapLimit: 5000, tapSpeed: 50},
];

let index = 0;

const clearSchema = (callback) => {
    Level.deleteMany().then (() => callback());
}

const migrate = () => {
    let level = new Level(data[index]);
    level.save().then((result) => {
        console.log(`Saved ${index + 1} item result`, result);
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
