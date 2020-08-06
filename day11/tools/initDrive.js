module.exports.initDrive = initDrive;//讓其他程式在引入時可以使用這個函式

function initDrive () {
    
    let webdriver = require('selenium-webdriver'), // 加入虛擬網頁套件
        By = webdriver.By,//你想要透過什麼方式來抓取元件，通常使用xpath、css
        until = webdriver.until;//直接抓到這個元件

    const chrome = require('selenium-webdriver/chrome');
    let options = new chrome.Options();
    options.setUserPreferences({ 'profile.default_content_setting_values.notifications': 1 });//因為FB會有notifications干擾到爬蟲，所以要先把它關閉

    let driver = new webdriver.Builder().forBrowser("chrome").withCapabilities(options).build();// 建立這個broswer的類型
    //考慮到ig在不同螢幕寬度時的Xpath不一樣，所以我們要在這裡設定統一的視窗大小
    driver.manage().window().setRect({ width: 1280, height: 800, x: 0, y: 0 });

    return { "driver": driver, "By": By, "until": until }
}
