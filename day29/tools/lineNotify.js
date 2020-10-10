const axios = require('axios')
var FormData = require('form-data');
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
    // 無法爬蟲的FB粉專、IG帳號名稱整合
    const fb_error_msg = await combineErrMsg(fb_error_title_array, "FB")
    const ig_error_msg = await combineErrMsg(ig_error_title_array, "IG")
    let error_msg = fb_error_msg + ig_error_msg

    // 組合傳送訊息
    const message =
        `\n\n已完成今日爬蟲排程作業` +
        `\n共費時:${time}` +
        `\n總計掃描FB粉專: ${fb_total_page} 、IG帳號: ${ig_total_page}` +
        `\nGoogle Sheet: https://docs.google.com/spreadsheets/d/${process.env.SPREADSHEET_ID}` +
        error_msg;
    
    const form_data = new FormData();
    form_data.append("message", message);

    const headers = Object.assign({
        'Authorization': `Bearer ${token}`
    }, form_data.getHeaders());

    axios({
        method: 'post',
        url: 'https://notify-api.line.me/api/notify',
        data: form_data,
        headers: headers
    }).then(function (response) {
        // HTTP狀態碼 200 代表成功
        console.log("HTTP狀態碼:" + response.status);
        // 觀察回傳的資料是否與 POSTMAN 測試一致
        console.log(response.data);
    }).catch(function (error) {
        console.error("LINE通知發送失敗");
        if (error.response) { // 顯示錯誤原因            
            console.error("HTTP狀態碼:" + error.response.status);
            console.error(error.response.data);
        } else {
            console.error(error);
        }
    });
}