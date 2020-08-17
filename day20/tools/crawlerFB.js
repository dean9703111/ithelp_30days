const fanpage_array = require('../json/fb.json');
const fb_username = process.env.FB_USERNAME
const fb_userpass = process.env.FB_PASSWORD
module.exports.crawlerFB = crawlerFB;//讓其他程式在引入時可以使用這個函式

async function crawlerFB (driver, By, until) {
    const isLogin = await loginFacebook(driver, By, until)
    if (isLogin) {//如果登入成功才執行下面的動作
        console.log(`FB開始爬蟲`)
        let result_array = []
        for (fanpage of fanpage_array) {
            let trace
            try {
                await goFansPage(driver, fanpage.url)
                trace = await getTrace(driver, By, until)
                if (trace === null) {
                    console.log(`${fanpage.title}無法抓取追蹤人數`)
                } else {
                    console.log(`${fanpage.title}追蹤人數：${trace}`)
                }
                await driver.sleep(Math.floor(Math.random()*5)+1)//建議每個粉絲專頁爬蟲產生亂數間隔1~6秒，不然很有可能被鎖帳號
            } catch (e) {
                console.error(e);
                continue;
            } finally {
                result_array.push({
                    url: fanpage.url,
                    title: fanpage.title,
                    trace: trace
                })
            }
        }
        return result_array
    }
}

async function loginFacebook (driver, By, until) {
    const web = 'https://www.facebook.com/login';//我們要前往FB
    try {
        await driver.get(web)//在這裡要用await確保打開完網頁後才能繼續動作

        //填入fb登入資訊
        const fb_email_ele = await driver.wait(until.elementLocated(By.xpath(`//*[@id="email"]`)), 3000);
        fb_email_ele.sendKeys(fb_username)
        const fb_pass_ele = await driver.wait(until.elementLocated(By.xpath(`//*[@id="pass"]`)), 3000);
        fb_pass_ele.sendKeys(fb_userpass)

        //抓到登入按鈕然後點擊
        const login_elem = await driver.wait(until.elementLocated(By.xpath(`//*[@id="loginbutton"]`)), 3000)
        login_elem.click()

        //因為登入這件事情要等server回應，你直接跳轉粉絲專頁會導致登入失敗
        await driver.wait(until.elementLocated(By.xpath(`//*[contains(@class,"_1vp5")]`)), 3000)//登入後才會有右上角的名字，我們以這個來判斷是否登入
        return true
    } catch (e) {
        console.error('FB登入失敗')
        console.error(e)
        return false
    }
}

async function goFansPage (driver, web_url) {
    //登入成功後要前往粉專頁面
    try {
        await driver.get(web_url)
    } catch (e) {
        console.error('無效的網址')
        console.error(e)
        return false
    }
}

async function getTrace (driver, By, until) {
    let fb_trace = 0;//這是紀錄FB追蹤人數
    try {
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
        return fb_trace
    } catch (e) {
        console.error(e)
        return null
    }
}