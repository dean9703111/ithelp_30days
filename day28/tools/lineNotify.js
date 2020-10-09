const axios = require('axios')
const querystring = require('querystring');
require('dotenv').config();

function lineNotify () {
    const token = process.env.LINE_TOKEN;
    axios({
        method: 'post',
        url: 'https://notify-api.line.me/api/notify',
        data: querystring.stringify({
            message: '測試 lineNotify',
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
// 測試是否成功發出訊息
lineNotify() 