// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

const Monster = require('../db/monster');
const Challenge = require('../db/challenge');

const monsters = async (req, res) => {
    const monsters = await Monster.find();
    return res.json({status: true, data: monsters});
}

const challenge = async (req, res) => {
    let idx = req.params.id;
    const challenge = await Challenge.findOne({challengeIndex: idx});
    return res.json({status: true, data: challenge});
}

module.exports = {
    monsters,
    challenge,
};