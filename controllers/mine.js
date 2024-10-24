const Mine = require('../db/mineItem');

const mineData = async (req, res) => {
    const mine = await Mine.find({});
    return res.json({data: mine});
}

const mineType = async (req, res) => {
    let { type } = req.body;
    const mine = await Mine.find({type: type});
    return res.json({data: mine});
}

const mineIndi = async (req, res) => {
    const mine = await Mine.findOne({isWear: true});
    return res.json({data: mine});
}

const mineDetail = async (req, res) => {
    let { id } = req.body;
    const mine = await Mine.findById(id);
    return res.json({data: mine});
}

const wearItem = async (req, res) => {
    let { id, type } = req.body;

    const past = await Mine.findOne({ isWear: true, type: type});
    if(past) await Mine.findByIdAndUpdate(past.id, {
        isWear: false
    }, { new: true });

    await Mine.findByIdAndUpdate(id, {
        isWear: true
    }, { new: true });
    const updated = await Mine.find({});
    return res.json({data: updated});
}

module.exports = {
    mineData,
    mineDetail,
    wearItem,
    mineIndi,
    mineType
};