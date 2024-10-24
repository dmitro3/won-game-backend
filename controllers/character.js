const Character = require('../db/character');
const Mine = require('../db/mineItem');

const viewCharacters = async (req, res) => {
    const characters = await Character.find({});
    if (characters.length == 0) return res.status(460).send("No chacracters! Please refresh the page!");
    return res.json({data: characters});
}

const addCharacter = async (req, res) => {
    let {title, energy, attack, defence, price, imageSrc} = req.body;
    let item = new Character({
        title: title,
        energy: energy,
        attack: attack, 
        defence: defence,
        price: price, 
        imageSrc: imageSrc,
        isLock: false
    });

    item.save();
    return res.json({data: item});
}

const unlockCharacter = async (req, res) => {
    let telegramId = req.params.id;
    let { name, id } = req.body;
    
    const character = await Character.findById(id);
    if (characters.length == 0) return res.status(460).send("No matched chacracter! Please refresh the page!");

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
    return res.json({data: updated});
}

module.exports = {
    viewCharacters,
    unlockCharacter,
    addCharacter
};