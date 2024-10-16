// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

const User = require('../db/user');
const Level = require('../db/level');

const userData = async (req, res) => {
    let telegramId = req.params.id;
    let { name } = req.body;
    let user = await User.findOne({telegramId});
    let lastLoginTimestamp = Date.now();
    if(!user) {
        user = new User({telegramId, name});
        user.save();
    }
    user.lastLoginTimestamp = lastLoginTimestamp;
    user.save();
    const level = await Level.findOne({levelIndex: user.levelIndex});
    return res.json({status: true, data: user, level: level});
}

const updateUser = async (req, res) => {
    let telegramId = req.params.id;
    let { levelIndex } = req.body;
    const user = await User.findOne({ telegramId: telegramId});
    if (user) {
        const result = await User.findByIdAndUpdate(user.id, {
            ...req.body
        }, { new: true });
        const level = await Level.findOne({levelIndex: levelIndex});
        return res.json({status: true, data: result, level: level});
    }
    else {  
        console.log("Matching row not found");
        res.json({
            status: false,
            data: err,
        });
    }
}

const updateLevel = async (req, res) => {
    let telegramId = req.params.id;
    let { levelIndex } = req.body;
    const user = await User.findOne({ telegramId: telegramId});
    if (user) {
        const result = await User.findByIdAndUpdate(user.id, {
            levelIndex: levelIndex,
        }, { new: true });
        const level = await Level.findOne({levelIndex: levelIndex});
        return res.json({status: true, data: result, level: level});
    }
    else {
        console.log("Matching row not found");
        res.json({
            status: false,
            data: err,
        });
    }
}

const ranking = async (req, res) => {
    const users = await User.find().sort({ tokens: -1});
    return res.json({status: true, data: users});
}

module.exports = {
    userData,
    updateUser,
    updateLevel,
    ranking,
};