const User = require('../db/user');
const Level = require('../db/level');
const Activity = require('../db/activity');

const viewActivity = async (req, res) => {
    let telegramId = req.params.id;
    let { name } = req.body;
    let activity = await Activity.findOne({telegramId});
    let user = await User.findOne({telegramId});
    let level = await Level.findOne({levelIndex: user ? user.levelIndex : 1});
    let lastLoginTime = Date.now();
    if(!activity) {
        activity = new Activity({telegramId, name});
    }
    else {
        let prev = new Date(activity.lastLoginTime);
        let curr = new Date(lastLoginTime);
        if(curr.getDate() - prev.getDate() >= 1) {
            activity.tapLimit = level.tapLimit;
            activity.isDailyReceived = false;
        }
    }
    activity.lastLoginTime = lastLoginTime;
    activity.save();
    return res.json({status: true, data: activity});
}

const updateActivity = async (req, res) => {
    let telegramId = req.params.id;
    let activity = await Activity.findOne({telegramId});
    let lastTappedTime = Date.now();
    let prev = new Date(activity.lastTappedTime);
    let curr = new Date(lastTappedTime);
    let c_date = activity.continueDate;
    if(curr.getDate() - prev.getDate() == 1) c_date++;
    else if(curr.getDate() - prev.getDate() > 1) c_date = 0;
    activity.lastTappedTime = lastTappedTime;
    activity.save();
    const result = await Activity.findByIdAndUpdate(activity.id, {
        ...req.body,
        continueDate: c_date,
    }, { new: true });
    
    return res.json({status: true, data: result});
}

module.exports = {
    viewActivity,
    updateActivity,
};