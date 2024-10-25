const User = require('../db/user');
const Level = require('../db/level');
const Activity = require('../db/activity');

const userData = async (req, res) => {
    let telegramId = req.params.id;
    let { name } = req.body;
    let level1, level2;

    let user = await User.findOne({telegramId});
    if(!user) {
        user = new User({telegramId, name});
        user.save();
    }

    level1 = await Level.findOne({levelIndex: user.levelIndex});
    if(user.levelIndex == 6) level2 = level1;
    else level2 = await Level.findOne({levelIndex: user.levelIndex + 1});

    if (!level1 || !level2) {
        return res.status(460).send("No matched level! Please refresh the page!");
    }

    return res.json({user, level: [level1, level2]});
}

const updateUser = async (req, res) => {
    let telegramId = req.params.id;
    const user = await User.findOne({ telegramId: telegramId});

    if (!user) {
        return res.status(460).send("No matched user! Please refresh the page!");
    }

    await User.findByIdAndUpdate(user.id, {
        ...req.body
    }, { new: true });

    return await userData(req, res);
}

const updateToken = async (req, res) => {
    let telegramId = req.params.id;
    let { tokenToAdd } = req.body;

    const user = await User.findOne({ telegramId: telegramId});
    if (!user) {
        return res.status(460).send("No matched user! Please refresh the page!");
    }

    await User.findByIdAndUpdate(user.id, {
        tokens: user.tokens + tokenToAdd,
    }, { new: true });

    return res.json({data: user.tokens + tokenToAdd});
}

const ranking = async (req, res) => {
    const users = await User.find().sort({ tokens: -1});
    return res.json({data: users});
}

const updateUserWithActivity = async (req, res) => {
    let telegramId = req.params.id;

    console.log("Update User With Activity");

    const user = await User.findOne({ telegramId: telegramId});
    if (!user) {
        return res.status(460).send("No matched user! Please refresh the page!");
    }
    await User.findByIdAndUpdate(user.id, {
        ...req.body
    }, { new: true });

    let activity = await Activity.findOne({telegramId});
    if (!activity) return res.status(460).send("No matched activity! Please refresh the page!");

    let lastTappedTime = Date.now();
    let prev = new Date(activity.lastTappedTime);
    let curr = new Date(lastTappedTime);
    let c_date = activity.continueDate;
    if(curr.getDate() - prev.getDate() == 1) c_date++;
    else if(curr.getDate() - prev.getDate() > 1) c_date = 0;

    await Activity.findByIdAndUpdate(activity.id, {
        ...req.body,
        lastTappedTime,
        continueDate: c_date,
    }, { new: true });

    return res.json({success: true});
}

module.exports = {
    userData,
    updateUser,
    updateToken,
    updateUserWithActivity,
    ranking,
};