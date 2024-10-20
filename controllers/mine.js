const Mine = require('../db/mineItem');

const mineData = (req, res) => {
    Mine.find({
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

const mineType = async (req, res) => {
    let { type } = req.body;
    const mine = await Mine.find({type: type});
    if (mine) {
        return res.json({status: true, data: mine});
    }
    else {
        console.log("Matching row not found");
        res.json({
            status: false,
            data: err,
        });
    }
}

const mineIndi = async (req, res) => {
    const mine = await Mine.findOne({isWear: true});
    if (mine) {
        console.log(mine);
        return res.json({status: true, data: mine});
    }
    else {
        console.log("Matching row not found");
        res.json({
            status: false,
            data: "err",
        });
    }
}

const mineDetail = async (req, res) => {
    let { id } = req.body;

    const mine = await Mine.findById(id);
    if (mine) {
        console.log(mine);
        return res.json({status: true, data: mine});
    }
    else {
        console.log("Matching row not found");
        res.json({
            status: false,
            data: err,
        });
    }
}

const wearItem = async (req, res) => {
    let { id, type } = req.body;
    const past = await Mine.findOne({ isWear: true, type: type});
    if(past) await Mine.findByIdAndUpdate(past.id, {
        isWear: false
    }, { new: true });
    const mine = await Mine.findById(id);
    if (mine) {
        const result = await Mine.findByIdAndUpdate(id, {
            isWear: true
        }, { new: true });
        const updated = await Mine.find({});
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
    mineData,
    mineDetail,
    wearItem,
    mineIndi,
    mineType
};