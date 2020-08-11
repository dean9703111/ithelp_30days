const fanpage_array = require('../json/ig.json');
const ig_username = process.env.IG_USERNAME
const ig_userpass = process.env.IG_PASSWORD
module.exports.crawlerIG = crawlerIG;//讓其他程式在引入時可以使用這個函式

async function crawlerIG (driver, By, until) {
    const isLogin = await loginInstagram(driver, By, until)
    if (isLogin) {//如果登入成功才執行下面的動作
        console.log(`IG開始爬蟲`)
        for (fanpage of fanpage_array) {
            await goFansPage(driver, fanpage.url)
            const trace = await getTrace(driver, By, until)
            if (trace === null) {
                console.log(`${fanpage.title}無法抓取追蹤人數`)
            } else {
                console.log(`${fanpage.title}追蹤人數：${trace}`)
            }
            await driver.sleep(1000)//建議每個粉絲專頁爬蟲至少間隔1秒，不然很有可能被鎖帳號
        }
    }
}

async function loginInstagram (driver, By, until) {
    const web = 'https://www.instagram.com/accounts/login';//前往IG登入頁面
    try {
        await driver.get(web)//在這裡要用await確保打開完網頁後才能繼續動作

        //填入ig登入資訊
        let ig_username_ele = await driver.wait(until.elementLocated(By.css("input[name='username']")), 3000);
        ig_username_ele.sendKeys(ig_username)
        let ig_password_ele = await driver.wait(until.elementLocated(By.css("input[name='password']")), 3000);
        ig_password_ele.sendKeys(ig_userpass)

        //抓到登入按鈕然後點擊
        const login_elem = await driver.wait(until.elementLocated(By.css("button[type='submit']")), 3000)
        login_elem.click()

        //登入後才會有右上角的頭像，我們以這個來判斷是否登入
        await driver.wait(until.elementLocated(By.xpath(`//*[@id="react-root"]//*[contains(@class,"_47KiJ")]`)), 3000)
        return true
    } catch (e) {
        console.error('IG登入失敗')
        console.error(e)
        return false
    }
}

async function goFansPage (driver, web_url) {
    //登入成功後要前往粉專頁面
    await driver.get(web_url)
}

async function getTrace (driver, By, until) {
    let ig_trace = 0;//這是紀錄IG追蹤人數
    try {
        const ig_trace_xpath = `//*[@id="react-root"]/section/main/div/header/section/ul/li[2]/a/span`
        const ig_trace_ele = await driver.wait(until.elementLocated(By.xpath(ig_trace_xpath)), 5000)//我們採取5秒內如果抓不到該元件就跳出的條件    
        // ig因為當人數破萬時文字不會顯示，所以改抓title
        ig_trace = await ig_trace_ele.getAttribute('title')
        ig_trace = ig_trace.replace(/\D/g, '')//只取數字

        return ig_trace
    } catch (e) {
        console.error(e)
        return null
    }
}