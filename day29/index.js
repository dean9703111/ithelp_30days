require('dotenv').config(); //載入.env環境檔
const { initDrive } = require("./tools/initDrive.js");
const { crawlerFB } = require("./tools/crawlerFB.js");
const { crawlerIG } = require("./tools/crawlerIG.js");
const { updateGoogleSheets } = require("./tools/google_sheets");
const { lineNotify } = require("./tools/lineNotify.js");
exports.crawler = crawler;//讓其他程式在引入時可以使用這個函式

async function crawler () {
    const start_time = new Date();
    const driver = initDrive();
    if (!driver) {//driver不存在就結束程式
        return
    }
    //因為有些人是用FB帳號登入IG，為了避免增加FB登出的動作，所以採取先對IG進行爬蟲
    const { "result_array": ig_result_array, "error_title_array": ig_error_title_array } = await crawlerIG(driver)
    const { "result_array": fb_result_array, "error_title_array": fb_error_title_array } = await crawlerFB(driver)
    driver.quit();
    //處理Google Sheets相關動作
    await updateGoogleSheets(ig_result_array, fb_result_array)
    const end_time = new Date();
    const spend_time = spendTime(start_time, end_time)
    //執行完畢後用 lineNotify 回報爬蟲狀況
    lineNotify(spend_time, ig_result_array.length, fb_result_array.length, ig_error_title_array, fb_error_title_array)
}

function spendTime (start_time, end_time) {
    const milisecond = end_time.getTime() - start_time.getTime()  //時間差的毫秒數  
    //計算出相差天數  
    const days = Math.floor(milisecond / (24 * 3600 * 1000))

    //計算出小時數  
    const leave1 = milisecond % (24 * 3600 * 1000)// 計算天數後剩余的毫秒數  
    const hours = Math.floor(leave1 / (3600 * 1000))
    //計算相差分鐘數  
    const leave2 = leave1 % (3600 * 1000)// 計算小時數後剩余的毫秒數  
    const minutes = Math.floor(leave2 / (60 * 1000))
    //計算相差秒數  
    const leave3 = leave2 % (60 * 1000)// 計算分鐘數後剩余的毫秒數  
    const seconds = Math.round(leave3 / 1000)

    let time_msg = ""
    if (days !== 0)
        time_msg = time_msg + days + '天'
    if (hours !== 0)
        time_msg = time_msg + hours + '小時'
    if (minutes !== 0)
        time_msg = time_msg + minutes + '分'
    if (seconds !== 0)
        time_msg = time_msg + seconds + '秒'
    return time_msg
}