const Milestone = require('../db/milestone');

const milestoneData = (req, res) => {
    let telegramId = req.params.id;
    let { name } = req.body;

    Milestone.find({
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

const updateStone = async (req, res) => {
    let telegramId = req.params.id;
    let { name, id } = req.body;

    console.log("id-------", id);
    
    const milestone = await Milestone.findById(id);
    if (milestone) {
        const result = await Milestone.findByIdAndUpdate(id, {
            isReceived: true
        }, { new: true });
        console.log(result);
    }
    else {
        console.log("Matching row not found");
        res.json({
            status: false,
            data: "err",
        });
    }
}

module.exports = {
    milestoneData,
    updateStone
};