const mongoose = require('mongoose');
const Monster = require('../monster');
require('dotenv').config();

const names = ['Weak', "Normal", 'Strong', 'Ninja'];
const data = [
    { levelIndex: 1, title: 'Bronze', avatar: 1, energyLimit: 1000, attack: 100, defense: 20, tokenEarns: 10, tokenSpend: 9, ratio: 1.2 },
    { levelIndex: 1, title: 'Siler', avatar: 1, energyLimit: 1000, attack: 100, defense: 20, tokenEarns: 10, tokenSpend: 9, ratio: 1.7 },
    { levelIndex: 1, title: 'Gold', avatar: 1, energyLimit: 1000, attack: 100, defense: 20, tokenEarns: 10, tokenSpend: 9, ratio: 2.5 },
    { levelIndex: 1, title: 'Platinum', avatar: 1, energyLimit: 1000, attack: 100, defense: 20, tokenEarns: 10, tokenSpend: 9, ratio: 3.3 },
    { levelIndex: 1, title: 'Diamond', avatar: 1, energyLimit: 1000, attack: 100, defense: 20, tokenEarns: 10, tokenSpend: 9, ratio: 4.5 },
    { levelIndex: 1, title: 'Master', avatar: 1, energyLimit: 1000, attack: 100, defense: 20, tokenEarns: 10, tokenSpend: 9, ratio: 7 },
];

let index = 0;

const clearSchema = (callback) => {
    Monster.deleteMany().then (() => callback());
}

const migrate = () => {
    let dataIdx = index % data.length;
    let nameIdx = Math.floor(index / data.length);
    let item = data[dataIdx];

    let needed = {
        ...data,
        levelIndex: index + 1,
        title: `${names[nameIdx]} ${item.title}`,
        avatarIndex: index % 2,
        energyLimit: Math.floor(item.energyLimit * item.ratio * (nameIdx + 1) * Math.pow(dataIdx + 1, 2)),
        attack: Math.floor(item.attack * item.ratio * (nameIdx + 1) * Math.pow(dataIdx + 1, 2) * 1.2),
        defense: Math.floor(item.defense * item.ratio * (nameIdx + 1) * Math.pow(dataIdx + 1, 2) / 1.2),
        tokenSpend: Math.floor(item.defense * item.ratio * (nameIdx + 1) * Math.pow(dataIdx + 1, 2) / 2),
        tokenEarns: Math.floor(item.defense * item.ratio * (nameIdx + 1) * Math.pow(dataIdx + 1, 2) / 1.5),
    };

    let monster = new Monster(needed);
    monster.save().then((result) => {
        console.log(`Saved 1 item result`, result);
        setTimeout(() => {
            index++;
            if (index < names.length * data.length) migrate();
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
