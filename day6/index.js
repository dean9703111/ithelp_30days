require('dotenv').config(); //載入.env環境檔
var webdriver = require('selenium-webdriver') // 加入虛擬網頁套件
function openCrawlerWeb () {
    var driver = new webdriver.Builder().forBrowser("chrome").build();// 建立這個broswer的類型
    const web = 'https://www.google.com/';//填寫你想要前往的網站
    driver.get(web)//透國這個driver打開網頁
}
openCrawlerWeb()//打開爬蟲網頁