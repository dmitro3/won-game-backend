const Monster = require('../db/monster');
const Challenge = require('../db/challenge');
const Level = require('../db/level');

const monsters = async (req, res) => {
    const monsters = await Monster.find();
    return res.json({data: monsters});
}

const challenge = async (req, res) => {
    let idx = req.params.id;
    const challenge = await Challenge.findOne({challengeIndex: idx});
    return res.json({data: challenge});
}

const addLevel = (req, res) => {
    let {title, tapBalanceRequired, levelIndex, energy, tapLimit, tapSpeed, icon } = req.body;
    let item = new Level({
        title: title,
        tapBalanceRequired: tapBalanceRequired,
        levelIndex: levelIndex,
        energy: energy,
        tapLimit: tapLimit, 
        tapSpeed: tapSpeed,
        icon: icon
    });

    item.save();
    return res.json({data: item});
}

const addMonster = (req, res) => {
    let {title, levelIndex, avatarIndex, energyLimit, attack, defense, tokenEarns, tokenSpend } = req.body;
    let item = new Monster({
        title: title,
        levelIndex: levelIndex,
        avatarIndex: avatarIndex,
        energyLimit: energyLimit, 
        attack: attack,
        defense: defense,
        tokenEarns: tokenEarns,
        tokenSpend: tokenSpend
    });

    item.save();
    return res.json({data: item});
}

const addChallenge = (req, res) => {
    let {title, levelIndex, challengeIndex, energyLimit, attack, defense, tokenEarns, avatarIndex } = req.body;
    let item = new Challenge({
        title: title,
        levelIndex: levelIndex,
        challengeIndex: challengeIndex,
        energyLimit: energyLimit, 
        attack: attack,
        defense: defense,
        tokenEarns: tokenEarns,
        avatarIndex: avatarIndex
    });

    item.save();
    return res.json({data: item});
}

module.exports = {
    monsters,
    challenge,
    addLevel,
    addMonster,
    addChallenge
};