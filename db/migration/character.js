const mongoose = require('mongoose');
const Character = require('../character');
require('dotenv').config();

const data = [
    { title: 'man1', imageSrc: '/assets/character/man1.png', price: 1200, energy: 1200, attack: 10, defence: 5, isLock: true},
    { title: 'man2', imageSrc: '/assets/character/man2.png', price: 1500, energy: 1500, attack: 15, defence: 3, isLock: true},
    { title: 'man3', imageSrc: '/assets/character/man3.png', price: 1700, energy: 1200, attack: 15, defence: 5, isLock: true},
    { title: 'man4', imageSrc: '/assets/character/man4.png', price: 2000, energy: 1500, attack: 20, defence: 7, isLock: true},
];

let index = 0;

const clearSchema = (callback) => {
    Character.deleteMany().then (() => callback());
}

const migrate = () => {
    let character = new Character(data[index]);
    character.save().then((result) => {
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
