const Character = require('../db/character');
const Mine = require('../db/mineItem');

const viewCharacters = async (req, res) => {
    const characters = await Character.find({});
    if (characters) {
        console.log("characters---",characters);
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
    console.log("id-------", id);
    
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
        console.log("unlock",result);
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

// const selectCharacter = async (req, res) => {
//     let telegramId = req.params.id;
//     let { name, id } = req.body;
//     console.log("id-------", id);
    
//     const shop = await Shop.findById(id);
//     if (shop) {
//         let mine = new Mine({
//             telegramId: telegramId,
//             name: name,
//             type: shop.type,
//             attribute: shop.attribute,
//             levelIndex: shop.levelIndex,
//             price: shop.price,
//             title: shop.title,
//             imageSrc: shop.imageSrc,
//             isWear: false
//         });

//         mine.save();
//         const result = await Shop.findByIdAndUpdate(id, {
//             isBuy: true
//         }, { new: true });
//         console.log(result);
//         const updated = await Shop.find({});
//         return res.json({status: true, data: updated});
//     }
//     else {
//         console.log("Matching row not found");
//         res.json({
//             status: false,
//             data: err,
//         });
//     }
// }

module.exports = {
    viewCharacters,
    unlockCharacter,
    // selectCharacter
};