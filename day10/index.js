require('dotenv').config(); //載入.env環境檔

//取出.env檔案填寫的FB資訊
const fb_username = process.env.FB_USERNAME
const fb_userpass = process.env.FB_PASSWORD

const webdriver = require('selenium-webdriver'), // 加入虛擬網頁套件
    By = webdriver.By,//你想要透過什麼方式來抓取元件，通常使用xpath、css
    until = webdriver.until;//直到抓到元件才進入下一步(可設定等待時間)

const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();
options.setUserPreferences({ 'profile.default_content_setting_values.notifications': 1 });//因為FB會有notifications干擾到爬蟲，所以要先把它關閉

const path = require('path');//用於處理文件路徑的小工具
const fs = require("fs");//讀取檔案用

function checkDriver () {
    try {
        chrome.getDefaultService()//確認是否有預設
    } catch {
        console.warn('找不到預設driver!');
        const file_path = '../chromedriver.exe'//'../chromedriver.exe'記得調整成自己的路徑
        console.log(path.join(__dirname, file_path));//請確認印出來日誌中的位置是否與你路徑相同
        if (fs.existsSync(path.join(__dirname, file_path))) {//確認路徑下chromedriver.exe是否存在            
            const service = new chrome.ServiceBuilder(path.join(__dirname, file_path)).build();//設定driver路徑
            chrome.setDefaultService(service);
            console.log('設定driver路徑');
        } else {
            console.error('無法設定driver路徑');
            return false
        }
    }
    return true
}

function getCrawlerPath () {
    if (process.env.FB_VERSION === 'new') {//如果是新版FB
        return {
            "fb_head_path": `//*[contains(@class,"fzdkajry")]`,
            "fb_trace_path": `//*[contains(@class,"knvmm38d")]`
        }
    } else {//如果為設定皆默認為舊版
        return {
            "fb_head_path": `//*[contains(@class,"_1vp5")]`,
            "fb_trace_path": `//*[@id="PagesProfileHomeSecondaryColumnPagelet"]//*[contains(@class,"_4bl9")]`
        }
    }
}

async function loginFacebookGetTrace () {

    if (!checkDriver()) {// 檢查Driver是否是設定，如果無法設定就結束程式
        return
    }

    let driver = new webdriver.Builder().forBrowser("chrome").withCapabilities(options).build();// 建立這個broswer的類型
    const web = 'https://www.facebook.com/login';//我們要前往FB
    await driver.get(web)//在這裡要用await確保打開完網頁後才能繼續動作

    //填入fb登入資訊
    const fb_email_ele = await driver.wait(until.elementLocated(By.xpath(`//*[@id="email"]`)));
    fb_email_ele.sendKeys(fb_username)
    const fb_pass_ele = await driver.wait(until.elementLocated(By.xpath(`//*[@id="pass"]`)));
    fb_pass_ele.sendKeys(fb_userpass)

    //抓到登入按鈕然後點擊
    const login_elem = await driver.wait(until.elementLocated(By.xpath(`//*[@id="loginbutton"]`)))
    login_elem.click()

    // FB有經典版以及新版的區分，兩者的爬蟲路徑不同，我們藉由函式取得各自的路徑
    const { fb_head_path, fb_trace_path } = getCrawlerPath();

    //因為登入這件事情要等server回應，你直接跳轉粉絲專頁會導致登入失敗
    await driver.wait(until.elementLocated(By.xpath(fb_head_path)))//用登入後才有的元件，來判斷是否登入

    //登入成功後要前往粉專頁面
    const fanpage = "https://www.facebook.com/baobaonevertell/" // 筆者是寶寶不說的狂熱愛好者
    await driver.get(fanpage)
    await driver.sleep(3000)
    
    let fb_trace = 0;//這是紀錄FB追蹤人數
    //因為考慮到登入之後每個粉專顯示追蹤人數的位置都不一樣，所以就採用全抓在分析
    const fb_trace_eles = await driver.wait(until.elementsLocated(By.xpath(fb_trace_path)))
    for (const fb_trace_ele of fb_trace_eles) {
        const fb_text = await fb_trace_ele.getText()
        if (fb_text.includes('人在追蹤')) {
            fb_trace = fb_text
            break
        }
    }
    console.log(`追蹤人數：${fb_trace}`)
    driver.quit();
}
loginFacebookGetTrace()//登入FB取得追蹤者資訊