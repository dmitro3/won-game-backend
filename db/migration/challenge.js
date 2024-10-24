const mongoose = require('mongoose');
const Challenge = require('../challenge');
require('dotenv').config();

const sample = { levelIndex: 1, title: 'Monster', avatar: 1, energyLimit: 1000, attack: 5, defense: 1, tokenEarns: 2 };

let index = 0;

const clearSchema = (callback) => {
    Challenge.deleteMany().then (() => callback());
}

const migrate = () => {
    let needed = {
        challengeIndex: index,
        levelIndex: Math.floor(index / 5) + 1,
        title: `${sample.title} ${index + 1}`,
        avatarIndex: Math.floor(index / 100) + 1,
        energyLimit: sample.energyLimit + index * 20,
        attack: sample.attack + index * 2,
        defense: sample.defense + index,
        tokenEarns: sample.tokenEarns + index,
    };

    let challenge = new Challenge(needed);
    challenge.save().then((result) => {
        console.log(`Saved 1 item result`, result);
        setTimeout(() => {
            index++;
            if (index < 200) migrate();
        }, 100);
    });
}

mongoose.connect(process.env.MONGODB_URI).then(
    () => {
        console.log('MongoDB connected!');
        clearSchema(() => migrate());
    }
).catch(
    err => console.error('MongoDB connection error:', err)
);
