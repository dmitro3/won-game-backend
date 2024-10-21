const Shop = require('../db/shopItem');
const Level = require('../db/level');
const Mine = require('../db/mineItem');

const shopData = (req, res) => {
    Shop.find({
    }).then(info => {
        return res.json({status: true, data: info});
    }).catch(err => {
        console.log("DB Error", err);
        res.json({
            status: false,
            data: err,
        });
    });
}

const makeItem = (req, res) => {
    let {title, type, attribute, levelIndex, price, imageSrc } = req.body;
    let item = new Shop({
        title: title,
        type: type,
        attribute: attribute, 
        levelIndex: levelIndex,
        price: price, 
        imageSrc: imageSrc,
        isBuy: false
    });

    item.save();
    return res.json({status: true, data: item});
}

const buyItem = async (req, res) => {
    let telegramId = req.params.id;
    let { name, id } = req.body;
    
    const shop = await Shop.findById(id);
    if (shop) {
        let mine = new Mine({
            telegramId: telegramId,
            name: name,
            type: shop.type,
            attribute: shop.attribute,
            levelIndex: shop.levelIndex,
            price: shop.price,
            title: shop.title,
            imageSrc: shop.imageSrc,
            isWear: false
        });

        mine.save();
        const result = await Shop.findByIdAndUpdate(id, {
            isBuy: true
        }, { new: true });
        console.log(result);
        const updated = await Shop.find({});
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
    shopData,
    buyItem,
    makeItem
};