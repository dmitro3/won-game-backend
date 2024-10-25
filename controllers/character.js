const Character = require('../db/character');
const Mine = require('../db/mineItem');

const viewCharacters = async (req, res) => {
    console.log("\n\n viewCharacters: Get characters! ====");
    const characters = await Character.find({});
    if (characters.length == 0) {
        console.log(" ====> No characters!");
        return res.status(460).send("No chacracters! Please refresh the page!");
    }

    return res.json({data: characters});
}

const addCharacter = async (req, res) => {
    let {title, energy, attack, defence, price, imageSrc} = req.body;

    console.log("\n\n addCharacter: Save new character! ====");

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
    
    console.log("\n\n unlockCharacter: Unlock bought characters! ====");

    const character = await Character.findById(id);
    if (!character) {
        console.log(" ====> No matched character exist : character id " + id);
        return res.status(460).send("No matched chacracter! Please refresh the page!");
    }

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