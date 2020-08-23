exports.initDrive = initDrive;//讓其他程式在引入時可以使用這個函式

const webdriver = require('selenium-webdriver') // 加入虛擬網頁套件
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();
options.setUserPreferences({ 'profile.default_content_setting_values.notifications': 1 });//因為FB會有notifications干擾到爬蟲，所以要先把它關閉

const path = require('path');//用於處理文件路徑的小工具
const fs = require("fs");//讀取檔案用

function initDrive() {
    checkDriver()//檢查driver是否設定

    let driver = new webdriver.Builder().forBrowser("chrome").withCapabilities(options).build();// 建立這個broswer的類型
    //考慮到ig在不同螢幕寬度時的Xpath不一樣，所以我們要在這裡設定統一的視窗大小
    driver.manage().window().setRect({ width: 1280, height: 800, x: 0, y: 0 });

    return driver
}

function checkDriver() {
    try { //確認driver是否設定
        chrome.getDefaultService()
    } catch {
        console.log('找不到預設driver!');
        let service;
        const file_path = '../../chromedriver.exe'//請注意因為改到tools底下執行，所以chromedriver.exe的相對位置需要變更
        console.log(path.join(__dirname, file_path));
        if (fs.existsSync(path.join(__dirname, file_path))) {
            service = new chrome.ServiceBuilder(path.join(__dirname, file_path)).build();
            console.log('設定driver路徑');
        }
        chrome.setDefaultService(service);
    }
}