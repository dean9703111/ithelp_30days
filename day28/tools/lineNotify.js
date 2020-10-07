var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config();
module.exports.lineNotify = lineNotify;

function lineNotify () {
    const Token = process.env.LINE_TOKEN;
    const LineNotifyURL = "https://notify-api.line.me/api/notify";
    
    let message = "message=測試 lineNotify"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            // 從回傳的 resonse 判斷是否正常傳送訊息
            console.log(xhttp.responseText);
            // status 為 200 代表正常
            console.log(xhttp.status);
        }
    };

    xhttp.open('POST', LineNotifyURL, true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader('Authorization', 'Bearer ' + Token);
    xhttp.send(message);
}
// 測試是否成功發出訊息
lineNotify() 