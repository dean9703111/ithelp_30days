require('dotenv').config(); //載入.env環境檔
var webdriver = require('selenium-webdriver') // 加入虛擬網頁套件
const chrome = require('selenium-webdriver/chrome');
const path = require('path');//載入路徑
var fs = require("fs");//讀取檔案用
function openCrawlerWeb() {

    // 下面這段是在windows始終無法找到chrome driver時可以設定絕對路徑
    try {
        chrome.getDefaultService()//確認是否有
    } catch {
        console.log('找不到預設driver!');
        let service;
        const file_path = '../chromedriver.exe'
        console.log(path.join(__dirname, file_path));//'../chromedriver.exe'是我的路徑，請確認印出來日誌中的位置是否與你路徑相同
        if (fs.existsSync(path.join(__dirname, file_path))) {//該路徑下chromedriver.exe是否存在            
            service = new chrome.ServiceBuilder(path.join(__dirname, file_path)).build();//設定driver路徑
            console.log('設定driver路徑');
        }
        chrome.setDefaultService(service);
    }

    var driver = new webdriver.Builder().forBrowser("chrome").build();// 建立這個broswer的類型
    const web = 'https://www.google.com/';//填寫你想要前往的網站
    driver.get(web)//透國這個driver打開網頁
}
openCrawlerWeb()//打開爬蟲網頁