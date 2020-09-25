#### [回目錄](../README.md)
## Day11 selenium-webdriver：登入Instagram並取得追蹤人數

>學習，從複製開始

🤔 筆者有話先說
----
有了Facebook爬蟲的經驗後，我相信這篇大家是有能力獨自完成的，`建議大家先用自己的方式來完成今日目標`，這篇文章適合實作遇到問題或是你實作完成後再來參考

----

🏆 今日目標
----
### 1. 完成IG自動登入
1.1 分析IG登入頁面的元件
1.2 改用css抓取元件，完成IG自動登入

### 2. 從畫面判斷使用者是否登入成功

### 3. 前往IG帳號並取得追蹤人數
3.1 了解響應式網頁對爬蟲的影響
3.2 設定瀏覽器開啟時的視窗大小
3.3 完成前往IG帳號並取得追蹤人數的程式

----

# 1. IG自動登入
### 1.1 分析IG登入頁面的元件
* 我在使用IG登入的[網址](https://www.instagram.com/accounts/login)時發現他登入的畫面偶爾會長不一樣(如下圖)導致Xpath路徑錯誤  
    <img src="./article_img/ig_login1.png" width="300" height="250"/>
    <img src="./article_img/ig_login2.png" width="300" height="250"/>  
* 一樣先進入開發者模式去認紅框內元件的特徵  
    <img src="./article_img/ig_login3.png" width="300" height="250"/>  
    * 在下圖我們觀察到 **電話號碼、用戶名稱或電子郵件** 以及 **密碼** 這兩個元件的 **共通點**：
        1. 都是 `input的html標籤`
        2. 用 `name這個attribute`來表示他們的作用
        <img src="./article_img/ig_login_user.png" width="400" height="60"/>  
        <img src="./article_img/ig_login_pass.png" width="400" height="60"/>  

    * **登入按鈕** 則用以下條件來取出：
        1. 使用 `button的html標籤`
        2. 用 `type這個attribute`來表示他要執行的動作
        <img src="./article_img/ig_login_btn.png" width="400" height="120"/>  

### 1.2 改用css抓取元件，完成IG自動登入
* 根據上面的分析後我們`改用css的方式來抓取IG登入的元件`來操作
    ```js
    //填入ig登入資訊
    let ig_username_ele = await driver.wait(until.elementLocated(By.css("input[name='username']")));
    ig_username_ele.sendKeys(ig_username)
    let ig_password_ele = await driver.wait(until.elementLocated(By.css("input[name='password']")));
    ig_password_ele.sendKeys(ig_userpass)

    //抓到登入按鈕然後點擊
    const login_elem = await driver.wait(until.elementLocated(By.css("button[type='submit']")))
    login_elem.click()
    ```
* 別忘記在.env檔填寫IG登入的帳號密碼
    ```
    #填寫自己登入IG的真實資訊(建議開小帳號來實驗，因為帳號使用太頻繁會被官方鎖住)
    IG_USERNAME='ig username'
    IG_PASSWORD='ig password'
    ```

----

# 2. 判斷使用者是否登入成功
* 與FB類似，IG要登入之後才會有右上角功能列，這裡我使用他作為判斷登入與否  
    <img src="./article_img/ig_header.png" width="400" height="380"/>  

    ```js
    //登入後才會有右上角功能列，我們以這個來判斷是否登入
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="react-root"]//*[contains(@class,"_47KiJ")]`)))
    ```

----

# 3. 抓出IG追蹤人數
### 3.1 了解響應式網頁對爬蟲的影響
* **響應式網頁設計(RWD)是什麼？**：網頁會根據瀏覽器解析度的不同重新排版，同一個網頁你在手機、平板、電腦看到的畫面配置都是不一樣的
* 如果你跟我一樣充滿實驗精神，你會發現`IG的頁面會隨著螢幕寬度更改而重新排版`，Xpath的路徑也會跟著改變  
    * 寬螢幕的Xpath  
        <img src="./article_img/ig_trace1.png" width="300" height="50"/>  
        ```
        //*[@id="react-root"]/section/main/div/header/section/ul/li[2]/a/span
        ```
    * 窄螢幕的Xpath  
        <img src="./article_img/ig_trace2.png" width="400" height="50"/>  
        ```
        //*[@id="react-root"]/section/main/div/ul/li[2]/a/span
        ```
### 3.2 設定瀏覽器開啟時的視窗大小
* 為了避免因為螢幕寬度不一樣造成Xpath不同，所以我們要`設定瀏覽器開啟時的視窗大小`(本專案以寬螢幕作為範例)，這樣才能保證你的爬蟲在不同電腦有一樣的執行結果
    ```js
    // 建立broswer的類型
    let driver = new webdriver.Builder().forBrowser("chrome").withCapabilities(options).build();
    //考慮到ig在不同螢幕寬度時的Xpath不一樣，所以我們要在這裡設定統一的視窗大小
    driver.manage().window().setRect({ width: 1280, height: 800, x: 0, y: 0 });
    ```
### 3.3 完成前往IG帳號並取得追蹤人數的程式    
* 在固定螢幕寬度後，使用Xpath就能穩定的抓出帳號追蹤人數
    ```js
    //登入成功後要前往粉專頁面
    const fanpage = "https://www.instagram.com/baobaonevertell/" // 筆者是寶寶不說的狂熱愛好者
    await driver.get(fanpage)
    await driver.sleep(3000)
    
    let ig_trace = 0;//這是紀錄IG追蹤人數
    const ig_trace_xpath = `//*[@id="react-root"]/section/main/div/header/section/ul/li[2]/a/span`
    const ig_trace_ele = await driver.wait(until.elementLocated(By.xpath(ig_trace_xpath)), 5000)//我們採取5秒內如果抓不到該元件就跳出的條件    
    // ig因為當人數破萬時文字不會顯示，所以改抓title
    ig_trace = await ig_trace_ele.getAttribute('title')
    console.log(`追蹤人數：${ig_trace}`)
    driver.quit();
    ```

----

執行程式
----
在專案資料夾的終端機(Terminal)執行指令
```vim
yarn start
```
你會看到Instagram自動登入 &rarr; 跳轉到指定帳號 &rarr; 關閉，如果能正確輸出該粉專的追蹤人數你就成功嚕～  
![image](./article_img/terminal.png)

到目前為止我們已經可以抓出 FB & IG 粉專的追蹤人數了，充滿好奇心的讀者可以先試著看看利用爬蟲爬完FB粉專後繼續爬IG  

----

ℹ️ 專案原始碼
----
* 今天的完整程式碼可以在[這裡](https://github.com/dean9703111/ithelp_30days/tree/master/day10)找到喔
* 我也貼心地把昨天的把昨天FB爬蟲的程式碼打包成[壓縮檔](https://github.com/dean9703111/ithelp_30days/raw/master/sampleCode/day10_sample_code.zip)，你可以用裡面乾淨的環境來實作今天的功能喔
    * 請記得在終端機下指令 **yarn** 才會把之前的套件安裝
    * 調整你.env檔填上IG登入資訊

>再次提醒本專案僅蒐集公開數據，避免人力資源的浪費，請勿作為不法用途

📖 參考資源
----
1. [Filling in login forms in Instagram using selenium and webdriver (chrome) python OSX](https://stackoverflow.com/a/49940401)  
<br>

>*免責聲明:文章技術僅抓取公開數據作爲研究，任何組織和個人不得以此技術盜取他人智慧財產、造成網站損害，否則一切后果由該組織或個人承擔。作者不承擔任何法律及連帶責任！*
### [Day12 selenium-webdriver：一隻程式爬完FB & IG粉專](/day12/README.md)