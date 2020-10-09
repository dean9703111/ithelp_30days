const axios = require('axios')
const querystring = require('querystring');
require('dotenv').config();
module.exports.lineNotify = lineNotify;
async function combineErrMsg (error_title_array, type) {
    let error_msg = ""
    for (const error_title of error_title_array) {
        error_msg = error_msg + '\n' + error_title
    }
    if (error_msg !== "") {
        error_msg = `\n\n下列${type}標題無法正常爬蟲:` + error_msg
    }
    return error_msg
}
async function lineNotify (time, ig_total_page, fb_total_page, ig_error_title_array, fb_error_title_array) {
    const token = process.env.LINE_TOKEN;
    // 將錯誤頁面列出來
    const fb_error_msg = await combineErrMsg(fb_error_title_array, "FB")
    const ig_error_msg = await combineErrMsg(ig_error_title_array, "FB")
    let error_msg = fb_error_msg + ig_error_msg

    //組合訊息
    const message =
        `\n\n已完成今日爬蟲排程作業` +
        `\n共費時:${time}` +
        `\n總計掃描FB粉專: ${fb_total_page} 、IG粉專: ${ig_total_page}` +
        `\nGoogle Sheet: https://docs.google.com/spreadsheets/d/${process.env.SPREADSHEET_ID}` +
        error_msg;
    axios({
        method: 'post',
        url: 'https://notify-api.line.me/api/notify',
        data: querystring.stringify({
            message: message,
        }),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        // status 為 200 代表正常
        console.log(response.status);
        // 從回傳的 resonse 判斷是否正常傳送訊息
        console.log(response.data);
    }).catch(function (error) {
        console.error("LINE通知發送失敗");
        if (error.response) { // 顯示錯誤原因            
            console.error(error.response.data);
            console.error(error.response.status);
        } else {
            console.error(error);
        }
    });
}