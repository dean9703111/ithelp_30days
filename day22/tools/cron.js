const CronJob = require('cron').CronJob;
const { crawler } = require("../index.js");
new CronJob(process.env.CRONJOB_TIME, function () {//請編輯.env檔填上自己的爬蟲時段喔
    console.log('開始執行爬蟲排程作業！');
    crawler()
}, null, true, 'Asia/Taipei');