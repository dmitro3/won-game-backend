const Activity = require('../db/activity');

const activityData = async (req, res) => {
    let telegramId = req.params.id;
    let { name } = req.body;
    let activity = await Activity.findOne({telegramId});
    let currentLoginTime = Date.now();
    if(!activity) {
        activity = new Activity({telegramId, name});
    }
    let prev = new Date(activity.lastLoginTime);
    let curr = new Date(currentLoginTime);
    if(curr.getDate() - prev.getDate() >= 1) activity.tapLimit = 100;
    activity.lastLoginTime = currentLoginTime;
    activity.save();
    return res.json({status: true, data: activity});
}

const updateActivity = async (req, res) => {
    let telegramId = req.params.id;
    let { tapLimit } = req.body;
    let currentTappedTime = Date.now();
    const activity = await Activity.findOne({ telegramId: telegramId});
    let prev = new Date(activity.lastTappedTime);
    let curr = new Date(currentTappedTime);
    let c_date = activity.continueDate, newTap = 0;
    if (activity) {
        if(curr.getDate() - prev.getDate() == 1) { 
            c_date++;
            newTap = 100
        }
        else if(curr.getDate() - prev.getDate() > 1) {
            c_date = 0;
            newTap = 100;
        }
        else {
            newTap= tapLimit;
        }
        const result = await Activity.findByIdAndUpdate(activity.id, {
            ...req.body,
            lastTappedTime: currentTappedTime,
            continueDate: c_date,
            tapLimit: newTap
        }, { new: true });
        return res.json({status: true, data: result});
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
    activityData,
    updateActivity,
};