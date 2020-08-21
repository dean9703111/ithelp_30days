#### [回目錄](../README.md)
## Day13 json讓你大量爬蟲

今天說的這個部分應該是大部分小編最關心的，要每天手動瀏覽那麼多的粉專想想都很崩潰  
今天要來跟大家介紹的一個很棒的文本格式 **json** (JavaScript Object Notation) ，他同時也是網頁api回傳最常見的一種格式  
我的文章偏向如何應用，如果你想對json有更深刻的理解請參考[這篇文章](https://www.footmark.info/programming-language/javascript/json-format-and-javascript/)裡面寫的超級詳盡、淺顯易動  

json實作
----
因為我們的目標就是搜集粉專並做分析，因為有多個粉專所以最外層是用 **陣列(array)** ，而單純從粉專連結上我們無法直覺的判斷出他是誰的粉專，所以裡面會用 **物件(object)** 來設定title及url這兩個屬性，json結構如下
```json
[
    {
        "title": "粉專A",
        "url": "粉專A連結"
    },
    {
        "title": "粉專B",
        "url": "粉專B連結"
    }  
]
```

大家請先在專案資料夾中建立 **json** 的資料夾專門存放你想要使用的json檔案，並在json資料夾中新增 **ig.json、fb.json** 這兩個檔案並寫入你希望去爬蟲的網址及他對應的名稱，如果把上面的json結構套用到 **ig.json** ，實際上就會長得像這樣(筆者是以下貼圖的狂熱愛好者，歡迎一起追蹤按愛心ＸＤ)
#### ig.json
```json
[
    {
        "title": "寶寶不說",
        "url": "https://www.instagram.com/baobaonevertell/"
    },
    {
        "title": "松尼",
        "url": "https://www.instagram.com/sweethouse.sl/"
    },
    {
        "title": "麻糬爸",
        "url": "https://www.instagram.com/mochi_dad/"
    },
    {
        "title": "好想兔",
        "url": "https://www.instagram.com/chien_chien0608/"
    },
    {
        "title": "ㄇㄚˊ幾兔",
        "url": "https://www.instagram.com/machiko324/"
    }
]
```

程式撰寫要點
----
* 只需要把這份json給引入(請注意路徑)就可以直接使用了  
    ```js
    const fanpage_array = require('../json/ig.json');
    ```
* 程式的部分只要改寫成for迴圈即可
    ```js
    for (fanpage of fanpage_array) {
        // 撰寫你要對fanpage做的事       
    }
    ```
* 我們要當個好爬蟲，每個頁面設定爬蟲間隔3-6秒(這裡我們使用Math.random()取得區間亂數)，不要因為自己的爬蟲造成別人伺服器的負擔
    ```js
    await driver.sleep((Math.floor(Math.random()*4)+3)*1000)//每個頁面爬蟲間隔3~6秒，不要造成別人的伺服器負擔
    ```
* 統整後完整程式如下
    #### crawlerIG.js
    ```js
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
                await driver.sleep((Math.floor(Math.random()*4)+3)*1000)//每個頁面爬蟲間隔3~6秒，不要造成別人的伺服器負擔
            }
        }
    }
    ...
    ```

執行程式
----
在專案資料夾的終端機(Terminal)執行指令 **yarn start** 指令，你會看到瀏覽器依序登入IG & FB並跳轉到你所列出的粉專，大概喝一口水的時間後，你就能看到FB & IG的追蹤人數嚕～  
![image](./article_img/terminal.png)  
搭配上json後有沒有覺得自己功力大增XD，上面的是IG的範例，大家可以自己嘗試看看FB部分的如何改寫喔～

專案原始碼
----
加入json後改寫的程式碼在[這裡](https://github.com/dean9703111/ithelp_30days/day13)喔
你可以整個專案clone下來  
```
git clone https://github.com/dean9703111/ithelp_30days.git
```
如果你已經clone過了，那你每天pull就能取得更新的資料嚕  
```
git pull origin master
cd day13
調整你.env檔填上 FB & IG 登入資訊
yarn
yarn start
```
### [Day14 優化爬蟲體驗 && 思路分享](../day14/README.md)