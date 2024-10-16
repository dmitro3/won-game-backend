const Character = require('../db/character');
const Mine = require('../db/mineItem');

const viewCharacters = async (req, res) => {
    const characters = await Character.find({});
    if (characters) {
        return res.json({status: true, data: characters});
    }
    else {
        console.log("Matching row not found");
        res.json({
            status: false,
            data: err,
        });
    }
}

const unlockCharacter = async (req, res) => {
    let telegramId = req.params.id;
    let { name, id } = req.body;
    const character = await Character.findById(id);
    if (character) {
        let mine = new Mine({
            telegramId: telegramId,
            name: name,
            type: "character",
            price: character.price,
            title: character.title,
            attack: character.attack,
            defence: character.defence,
            energy: character.energy,
            imageSrc: character.imageSrc,
            isWear: false
        });

        mine.save();
        const result = await Character.findByIdAndUpdate(id, {
            isLock: false
        }, { new: true });
        const updated = await Character.find({});
        return res.json({status: true, data: updated});
    }
    else {
        console.log("Matching row not found");
        res.json({
            status: false,
            data: err,
        });
    }
}

module.exports = {
    viewCharacters,
    unlockCharacter,
};