var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config();
module.exports.lineNotify = lineNotify;

function lineNotify (time, fb_total_page, ig_total_page, fb_error_title_array, ig_error_title_array) {
    const Token = process.env.LINE_TOKEN;
    const LineNotifyURL = "https://notify-api.line.me/api/notify";
    // 將錯誤頁面列出來
    let error_msg = ""
    for (let i = 0; i < fb_error_title_array.length; i++) {
        if (i === 0) {
            error_msg = error_msg + "\n\n下列FB標題無法正常爬蟲:"
        }
        error_msg = error_msg + '\n' + fb_error_title_array[i]
    }
    for (let i = 0; i < ig_error_title_array.length; i++) {
        if (i === 0) {
            error_msg = error_msg + "\n\n下列IG標題無法正常爬蟲:"
        }
        error_msg = error_msg + '\n' + ig_error_title_array[i]
    }

    // 組合訊息
    const message = "message=" +
        `\n\n已完成今日爬蟲排程作業` +
        `\n共費時:${time}` +
        `\n總計掃描FB粉專: ${fb_total_page} 、IG粉專: ${ig_total_page}` +
        `\nGoogle Sheet: https://docs.google.com/spreadsheets/d/${process.env.SPREADSHEET_ID}` +
        error_msg;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            console.log(xhttp.responseText);
            console.log(xhttp.status);
        }
    };

    xhttp.open('POST', LineNotifyURL, true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader('Authorization', 'Bearer ' + Token);
    xhttp.send(message);
}