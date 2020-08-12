require('dotenv').config(); //載入.env環境檔
const { initDrive } = require("./tools/initDrive.js");
const { crawlerFB } = require("./tools/crawlerFB.js");
const { crawlerIG } = require("./tools/crawlerIG.js");
const { updateGoogleSheets } = require("./tools/googleSheets.js");

async function crawler () {
    // const { driver, By, until } = initDrive();
    // //因為有些人是用FB帳號登入IG，為了避免增加FB登出的動作，所以採取先對IG進行爬蟲
    // await crawlerIG(driver, By, until)
    // await crawlerFB(driver, By, until)
    // driver.quit();
    //處理Google Sheets相關動作
    await updateGoogleSheets()
}

crawler()