const Shop = require('../db/shopItem');
const Level = require('../db/level');
const Mine = require('../db/mineItem');

const shopData = async (req, res) => {
    console.log("\n\n shopData: Get all shop data! ====");
    const info = await Shop.find({});
    if (info.length == 0) {
        console.log(" ====> No shop items to buy!");
        return res.status(460).send("No items to buy! Please refresh the page!");
    }
    res.json({data: info});
}

const makeItem = (req, res) => {
    let {title, type, attribute, levelIndex, price, imageSrc } = req.body;

    console.log("\n\n makeItem: Create shop item to buy! ====");

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
    return res.json({data: item});
}

const buyItem = async (req, res) => {
    let telegramId = req.params.id;
    let { name, id } = req.body;
    
    console.log("\n\n buyItem: Buy item from shop! ====");

    const shop = await Shop.findById(id);
    if (!shop) {
        console.log(" ====> No matched item to buy exist : id " + id);
        return res.status(460).send("No item exists! Please refresh the page!");
    }

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
    await Shop.findByIdAndUpdate(id, {
        isBuy: true
    }, { new: true });
    const updated = await Shop.find({});
    return res.json({data: updated});
}

module.exports = {
    shopData,
    buyItem,
    makeItem
};