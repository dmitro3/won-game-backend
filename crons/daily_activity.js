const cron = require('node-cron');
const Activity = require('../db/activity');
const User = require('../db/user');
const Level = require('../db/level');

console.log("Cron job for daily update started!");
cron.schedule('0 0 * * *', async () => {
    try {
        console.log("Running daily reset job...");

        // Fetch all activities
        let activities = await Activity.find();

        // Iterate through each activity and check if a day has passed
        for (let activity of activities) {
            let prev = new Date(activity.lastLoginTime);
            let curr = new Date(); // Current date
            let user = await User.findOne({ telegramId: activity.telegramId });
            let level = await Level.findOne({ levelIndex: user ? user.levelIndex : 1 });

            // Check if a day has passed (comparing dates only, not time)
            if (curr.getDate() !== prev.getDate() || curr.getMonth() !== prev.getMonth() || curr.getFullYear() !== prev.getFullYear()) {
                // Reset tapLimit and isDailyReceived if a day has passed
                activity.tapLimit = level.tapLimit;
                activity.isDailyReceived = false;
                activity.lastLoginTime = curr;
                await activity.save();

                console.log(`Updated activity for telegramId: ${activity.telegramId}`);
            }
        }

        console.log("Daily reset job completed.");
    } catch (error) {
        console.error("Error running daily reset job:", error);
    }
});
