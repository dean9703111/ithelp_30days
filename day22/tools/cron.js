var CronJob = require('cron').CronJob;
new CronJob('5,20,30 * * * * *', function () {
    const datetime = new Date();
    console.log(datetime);
}, null, true);