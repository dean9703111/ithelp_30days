require('dotenv').config(); //載入.env環境檔

//請在.env檔案填寫自己登入FB的真實資訊(建議開小帳號，因為如果爬蟲使用太頻繁你的帳號會被鎖住)
const ig_username = process.env.IG_USERNAME
const ig_userpass = process.env.IG_PASSWORD

var webdriver = require('selenium-webdriver'), // 加入虛擬網頁套件
    By = webdriver.By,//你想要透過什麼方式來抓取元件，通常使用xpath、css
    until = webdriver.until;//直接抓到這個元件

const chrome = require('selenium-webdriver/chrome');
var options = new chrome.Options();
options.setUserPreferences({ 'profile.default_content_setting_values.notifications': 1 });//因為FB會有notifications干擾到爬蟲，所以要先把它關閉

const path = require('path');//載入路徑
var fs = require("fs");//讀取檔案用

async function loginInstagramGetTrace () {

    let service;
    try {
        chrome.getDefaultService()//確認是否有
    } catch {
        if (fs.existsSync(path.join(__dirname, '../chromedriver.exe'))) {//該路徑下chromedriver.exe是否存在
            console.log(path.join(__dirname, '../chromedriver.exe'));//存在就會列印出來路徑
            service = new chrome.ServiceBuilder(path.join(__dirname, '../chromedriver.exe')).build();//設定driver路徑
        }
        chrome.setDefaultService(service);
    }

    var driver = new webdriver.Builder().forBrowser("chrome").withCapabilities(options).build();// 建立這個broswer的類型
    //考慮到ig在不同螢幕寬度時的Xpath不一樣，所以我們要在這裡設定統一的視窗大小
    driver.manage().window().setRect({ width: 1280, height: 800, x: 0, y: 0 });
    
    const web = 'https://www.instagram.com/accounts/login';//前往IG登入頁面
    await driver.get(web)//在這裡要用await確保打開完網頁後才能繼續動作

    //填入ig登入資訊
    let ig_username_ele = await driver.wait(until.elementLocated(By.css("input[name='username']")));
    ig_username_ele.sendKeys(ig_username)
    let ig_password_ele = await driver.wait(until.elementLocated(By.css("input[name='password']")));
    ig_password_ele.sendKeys(ig_userpass)

    //抓到登入按鈕然後點擊
    const login_elem = await driver.wait(until.elementLocated(By.css("button[type='submit']")))
    login_elem.click()

    //登入後才會有右上角的頭像，我們以這個來判斷是否登入
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="react-root"]//*[contains(@class,"_47KiJ")]`)))

    //登入成功後要前往粉專頁面
    const ig_fans_web = "https://www.instagram.com/baobaonevertell/" // 筆者是寶寶不說的狂熱愛好者
    await driver.get(ig_fans_web)

    let ig_trace = 0;//這是紀錄IG追蹤人數
    const ig_trace_xpath = `//*[@id="react-root"]/section/main/div/header/section/ul/li[2]/a/span`
    const ig_trace_ele = await driver.wait(until.elementLocated(By.xpath(ig_trace_xpath)), 5000)//我們採取5秒內如果抓不到該元件就跳出的條件    
    // ig因為當人數破萬時文字不會顯示，所以改抓title
    ig_trace = await ig_trace_ele.getAttribute('title')
    console.log(`追蹤人數：${ig_trace}`)
    driver.quit();
}
loginInstagramGetTrace()//登入IG並取得追蹤人數