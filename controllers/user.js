// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

const User = require('../db/user');
const Level = require('../db/level');

const userData = async (req, res) => {
    let telegramId = req.params.id;
    let { name } = req.body;
    let level1, level2;
    let user = await User.findOne({telegramId});
    if(!user) {
        user = new User({telegramId, name});
        user.save();
    }
    level1 = await Level.findOne({levelIndex: user.levelIndex});
    if(user.levelIndex == 6) level2 = level1;
    else level2 = await Level.findOne({levelIndex: user.levelIndex + 1});
    console.log("User", user);
    console.log("Level", level1, level2);
    return res.json({status: true, data: user, level: [level1, level2]});
}

const updateUser = async (req, res) => {
    let telegramId = req.params.id;
    let { levelIndex } = req.body;
    let level1, level2;
    const user = await User.findOne({ telegramId: telegramId});
    if (user) {
        const result = await User.findByIdAndUpdate(user.id, {
            ...req.body
        }, { new: true });
        level1 = await Level.findOne({levelIndex: levelIndex});
        if(levelIndex == 6) level2 = level1;
        else level2 = await Level.findOne({levelIndex: levelIndex + 1});
        console.log("User", user);
        console.log("Level", level1, level2);
        return res.json({status: true, data: result, level: [level1, level2]});
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
    ranking,
};