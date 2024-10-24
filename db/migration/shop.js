const mongoose = require('mongoose');
const Shop = require('../shopItem');
require('dotenv').config();

const data = [
    { levelIndex: 1, title: 'attack1', imageSrc: '/assets/weapon/weapon1.png', price: 200, attribute: 5, type: "attack", isBuy: false},
    { levelIndex: 1, title: 'attack2', imageSrc: '/assets/weapon/weapon2.png', price: 300, attribute: 15, type: "attack", isBuy: false},
    { levelIndex: 2, title: 'attack3', imageSrc: '/assets/weapon/weapon3.png', price: 400, attribute: 25, type: "attack", isBuy: false},
    { levelIndex: 2, title: 'attack4', imageSrc: '/assets/weapon/weapon4.png', price: 500, attribute: 35, type: "attack", isBuy: false},
    { levelIndex: 3, title: 'attack5', imageSrc: '/assets/weapon/weapon5.png', price: 600, attribute: 45, type: "attack", isBuy: false},
    { levelIndex: 3, title: 'attack6', imageSrc: '/assets/weapon/weapon6.png', price: 700, attribute: 55, type: "attack", isBuy: false},
    { levelIndex: 4, title: 'attack7', imageSrc: '/assets/weapon/weapon7.png', price: 800, attribute: 65, type: "attack", isBuy: false},
    { levelIndex: 5, title: 'attack8', imageSrc: '/assets/weapon/weapon8.png', price: 900, attribute: 75, type: "attack", isBuy: false},
    { levelIndex: 5, title: 'attack9', imageSrc: '/assets/weapon/weapon9.png', price: 100, attribute: 85, type: "attack", isBuy: false},
    { levelIndex: 6, title: 'attack10', imageSrc: '/assets/weapon/weapon10.png', price: 1200, attribute: 105, type: "attack", isBuy: false},

    { levelIndex: 1, title: 'defence1', imageSrc: '/assets/shield/shield1.png', price: 400, attribute: 23, type: "defence", isBuy: false},
    { levelIndex: 2, title: 'defence2', imageSrc: '/assets/shield/shield2.png', price: 600, attribute: 38, type: "defence", isBuy: false},
    { levelIndex: 3, title: 'defence3', imageSrc: '/assets/shield/shield3.png', price: 800, attribute: 49, type: "defence", isBuy: false},
    { levelIndex: 4, title: 'defence4', imageSrc: '/assets/shield/shield4.png', price: 1000, attribute: 68, type: "defence", isBuy: false},
    { levelIndex: 5, title: 'defence5', imageSrc: '/assets/shield/shield5.png', price: 1200, attribute: 89, type: "defence", isBuy: false},
    { levelIndex: 6, title: 'defence6', imageSrc: '/assets/shield/shield6.png', price: 1400, attribute: 125, type: "defence", isBuy: false},
];

let index = 0;

const clearSchema = (callback) => {
    Shop.deleteMany().then (() => callback());
}

const migrate = () => {
    let shop = new Shop(data[index]);
    shop.save().then((result) => {
        console.log(`Saved ${index + 1} item result`, result);
        setTimeout(() => {
            index++;
            if (index < data.length) migrate();
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
