#### [回目錄](../README.md)
### Day11 重構程式碼，讓合作夥伴對你比讚

程式的重構
----
昨天我們完成了一個**跑得動的程式**，但很明顯並**不是一個好的程式**  
不知道有沒有人覺得這幾天下來隨著程式越來越長感覺到對他的掌握力下降  
根據clean code的原則而言就是程式寫得很爛XD  
很多人為了追求程式的功能埋頭狂寫，這樣很容易導致你日後維護以及交接的困難性  

接著我們用目前專案的程式所犯的錯誤舉例:
----
## 1. 主程式做了太多事情
主程式只需要知道他該執行哪個函式就足夠了，我們應該把這些函式轉移到另外的資料夾(ex:tools)，依據大功能去命名檔名，範例如下:  

    1. 主程式 - index.js
    2. 初始化瀏覽器 - tools/initDrive.js
    3. Facebook爬蟲 - tools/crawlerFB.js
    3. Instagram爬蟲 - tools/crawlerIG.js
在這樣的分工後我們的主程式是不是變得很乾淨呢？
#### index.js
```js
require('dotenv').config(); //載入.env環境檔
const { initDrive } = require("./tools/initDrive.js");
const { crawlerFB } = require("./tools/crawlerFB.js");
const { crawlerIG } = require("./tools/crawlerIG.js");

async function crawler () {

    const { driver, By, until } = initDrive();
    //因為有些人是用FB帳號登入IG，為了避免增加FB登出的動作，所以採取先對IG進行爬蟲
    await crawlerIG(driver, By, until)
    await crawlerFB(driver, By, until)

    driver.quit();
}
crawler()
```
## 2. 一個函式做了太多事情
現在我們把FB的登入以及取得追蹤人數寫在同一隻函式，這樣會增加你日後維護的困難度，因為函式越長，你越難抓出錯誤的點；以loginFacebookGetTrace這隻函式舉例，它實際上可以解構成幾個部分：  
    1. Facebook爬蟲 - crawlerFB
    2. 登入Facebook - loginFacebook
    3. 前往粉絲頁 - goFansPage
    4. 取得追蹤人數 - getTrace
把每個功能獨立成函式，你就能輕鬆除錯(debug)
#### crawlerFB.js
```js
const fb_username = process.env.FB_USERNAME
const fb_userpass = process.env.FB_PASSWORD

module.exports.crawlerFB = crawlerFB;//讓其他程式在引入時可以使用這個函式

async function crawlerFB (driver, By, until) {
    await loginFacebook(driver, By, until)
    const fanpage = "https://www.facebook.com/baobaonevertell/" 
    await goFansPage(driver, fanpage)
    await getTrace(driver, By, until)
}

async function loginFacebook (driver, By, until) {
    const web = 'https://www.facebook.com/';//我們要前往FB
    await driver.get(web)//在這裡要用await確保打開完網頁後才能繼續動作

    //填入fb登入資訊
    const fb_email_ele = await driver.wait(until.elementLocated(By.xpath(`//*[@id="email"]`)));
    fb_email_ele.sendKeys(fb_username)
    const fb_pass_ele = await driver.wait(until.elementLocated(By.xpath(`//*[@id="pass"]`)));
    fb_pass_ele.sendKeys(fb_userpass)

    //抓到登入按鈕然後點擊
    const login_elem = await driver.wait(until.elementLocated(By.xpath(`//*[@id="u_0_b"]`)))
    login_elem.click()

    //因為登入這件事情要等server回應，你直接跳轉粉絲專頁會導致登入失敗
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="u_0_a"]`)))//登入後才會有右上角的頭像，我們以這個來判斷是否登入
}

async function goFansPage (driver, web_url) {
    //登入成功後要前往粉專頁面
    await driver.get(web_url)
}

async function getTrace (driver, By, until) {
    let fb_trace = 0;//這是紀錄FB追蹤人數
    //因為考慮到登入之後每個粉專顯示追蹤人數的位置都不一樣，所以就採用全抓在分析
    const fb_trace_xpath = `//*[@id="PagesProfileHomeSecondaryColumnPagelet"]//*[contains(@class,"_4bl9")]`
    const fb_trace_eles = await driver.wait(until.elementsLocated(By.xpath(fb_trace_xpath)), 5000)//我們採取5秒內如果抓不到該元件就跳出的條件
    for (const fb_trace_ele of fb_trace_eles) {
        const fb_text = await fb_trace_ele.getText()
        if (fb_text.includes('人在追蹤')) {
            fb_trace = fb_text.replace(/\D/g, '')//只取數字
            break
        }
    }
    console.log(`FB追蹤人數：${fb_trace}`)
}
```
## 3. 將宣告的複雜的物件獨立成為函式
你可以觀察到有幾個變數會被高頻率使用，但是他的宣告真的超級複雜  
這時候我們就應該把他獨立出來，這樣你只需要在這隻副程式確認你宣告的物件是否都正常設定，而主程式很單純的使用回傳的物件即可
```js
module.exports.initDrive = initDrive;//讓其他程式在引入時可以使用這個函式

let webdriver = require('selenium-webdriver'), // 加入虛擬網頁套件
    By = webdriver.By,//你想要透過什麼方式來抓取元件，通常使用xpath、css
    until = webdriver.until;//直接抓到這個元件
let chrome = require('selenium-webdriver/chrome');
let options = new chrome.Options();
options.setUserPreferences({ 'profile.default_content_setting_values.notifications': 1 });//因為FB會有notifications干擾到爬蟲，所以要先把它關閉

const path = require('path');//載入路徑
var fs = require("fs");//讀取檔案用

function initDrive() {
    checkDriver()//檢查driver是否設定

    let driver = new webdriver.Builder().forBrowser("chrome").withCapabilities(options).build();// 建立這個broswer的類型
    //考慮到ig在不同螢幕寬度時的Xpath不一樣，所以我們要在這裡設定統一的視窗大小
    driver.manage().window().setRect({ width: 1280, height: 800, x: 0, y: 0 });

    return { "driver": driver, "By": By, "until": until }
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

```

我這篇文章是以自己的程式作為範例講解，如果你想更深入了解重構請，請閱讀[重構—改善既有的程式設計](https://medium.com/%E5%BE%8C%E7%AB%AF%E6%96%B0%E6%89%8B%E6%9D%91/%E7%AD%86%E8%A8%98-%E9%87%8D%E6%A7%8B-chapter-1-2-%E7%AC%AC%E4%B8%80%E5%80%8B%E7%AF%84%E4%BE%8B-%E9%87%8D%E6%A7%8B%E5%8E%9F%E5%89%87-ca57a6d40f42)，他深入淺出說明重構的原則讓我受益良多

如果你還有什麼問題或是覺得有可以改善的地方歡迎在下方留言討論  

完整的重構過的程式碼在[這裡](https://github.com/dean9703111/ithelp_30days/day11)喔
你可以整個專案clone下來  
```
git clone https://github.com/dean9703111/ithelp_30days.git
```
如果你已經clone過了，那你每天pull就能取得更新的資料嚕  
```
git pull origin master
cd day11
調整你.env檔填上 FB & IG 登入資訊
yarn
yarn start
```
### [Day12 Try & Catch讓程式更穩定](../day12/README.md)