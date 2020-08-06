### Day11 重構程式碼，讓合作夥伴對你比讚

程式的重構
----
昨天我們完成了一個**跑得動的程式**，但很明顯並**不是一個好的程式**  
不知道有沒有人覺得這幾天下來隨著程式越來越長感覺到對他的掌握力下降  
根據clean code的原則而言就是程式寫得很爛XD  
很多人為了追求程式的功能埋頭狂寫，這樣很容易導致你日後維護以及交接的困難性  

接著我們用目前專案的程式所犯的錯誤舉例:

主程式做了太多事情
----
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
    await crawlerFB(driver, By, until)
    await crawlerIG(driver, By, until)

    driver.quit();
}
crawler()
```
一個函式做了多件事情
----
現在我們把FB的登入以及取得追蹤人數寫在同一隻函式，這樣會增加你日後維護的困難度，因為函式越長，你越難抓出錯誤的點；以loginFacebookGetTrace這隻函式舉例，它實際上可以解構成幾個部分：  

    1. 登入Facebook - loginFacebook
    2. 前往粉絲頁 - goFansPage
    3. 取得追蹤人數 - getTrace
#### crawlerFB.js
```js
const fb_username = process.env.FB_USERNAME
const fb_userpass = process.env.FB_PASSWORD

module.exports.crawlerFB = crawlerFB;//讓其他程式在引入時可以使用這個函式

async function crawlerFB (driver, By, until) {
    await loginFacebook(driver, By, until)
    const fb_fans_web = "https://www.facebook.com/baobaonevertell/" 
    await goFansPage(driver, fb_fans_web)
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



我這篇文章是以自己的程式作為範例講解，如果你想更深入了解重構請，請閱讀[重構—改善既有的程式設計](https://medium.com/%E5%BE%8C%E7%AB%AF%E6%96%B0%E6%89%8B%E6%9D%91/%E7%AD%86%E8%A8%98-%E9%87%8D%E6%A7%8B-chapter-1-2-%E7%AC%AC%E4%B8%80%E5%80%8B%E7%AF%84%E4%BE%8B-%E9%87%8D%E6%A7%8B%E5%8E%9F%E5%89%87-ca57a6d40f42)，他深入淺出的講解重構的原則我覺得受益良多