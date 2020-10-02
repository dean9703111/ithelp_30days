#### [回目錄](../README.md)
## Day21 Google Sheets-咦咦咦？更動了下爬蟲清單怎麼資料塞錯位置了？

>客戶的操作跟你想的不一樣

🤔 為什麼寫這篇文章？
----
其實這份專案完成到昨天的進度時就給業主做功能上的確認準備結案了  
但一個案子通常很難一次就通過，無論這隻程式在你電腦上執行的多麼穩定，放到別人的電腦上總會冒出大大小小的bug，我大概歸類成以下幾種：
1. 作業系統不同導致的
2. 套件版本不同導致
3. 客戶的操作跟你預想的不一樣




今天所說的內容是在實務上遇到的，你要思考看看在什麼樣的情形下的的Google Sheets表單可能會亂掉(先排除一些惡意操作，因為惡意操作下要解決的問題太多了)
1. Google Sheets在粉專名稱的欄位被整理過了(有可能是被刪除、上下置換)
2. fb.json、ig.json裡面有新增/刪除/上下置換

* EX: 我把fb.json中的'麻糬爸愛亂畫'刪除，然後把'寶寶不說'移到第二個來跑跑看
    ```json
    [
        
        {
            "title": "鹿尼",
            "url": "https://www.facebook.com/%E9%B9%BF%E5%B0%BC-260670294340690/"
        },
        {
            "title": "寶寶不說",
            "url": "https://www.facebook.com/baobaonevertell/"
        },
        {
            "title": "好想兔",
            "url": "https://www.facebook.com/chien760608/"
        },
        {
            "title": "ㄇㄚˊ幾兔",
            "url": "https://www.facebook.com/machiko324/"
        }
    ]
    ```
* 執行程式 **yarn start** 後你就會發現excel的表格亂掉了  
    ![image](./article_img/googlesheetserr.png)  
如果這些經常性的動作會造成excel顯示上的錯誤，那就代表我們的程式還有需要改良的地方

讓新資料塞入正確的欄位
----
因為使用者最終都是看excel跑出來的資料，所以我們規劃的方向是跑完程式後excel排序不會改變，實作上也會拆成幾個步驟：
1. 依照sheet title取得第一欄粉專名稱的array
2. 將 **線上粉專名稱的array** 與 **本機的json檔案粉專名稱的array** 做對比
3. 如果對比結果本機的資料有新增，那粉專名稱就會加入到excel最下方
4. 我們將以這份最新統整過的array進行爬蟲

今天的目標為增加讀取第一欄粉專名稱函式(readTitle)、改寫writeSheet函式  
  * readTitle : 依照sheet title取得第一欄粉專名稱的array
    ```js
    async function readTitle (title, auth) {
      const sheets = google.sheets({ version: 'v4', auth });
      const request = {
        spreadsheetId: process.env.SPREADSHEET_ID,
        ranges: [
          `'${title}'!A:A`
        ],
        valueRenderOption: "FORMULA"
      }
      try {
        let title_array = []
        let values = (await sheets.spreadsheets.values.batchGet(request)).data.valueRanges[0].values;
        if (values) {//如果沒資料values會是undefine，所以我們只在有資料時塞入
          title_array = values.map(value => value[0]);
          // title_array = values
        }
        // console.log(title_array)
        return title_array
      } catch (err) {
        console.error(err);
      }
    }
    ```
  * writeSheet 
      1. 取得線上的粉專名稱array，並將json檔案裡面有新增的粉專合併進去
          ```js
          // 取得線上的title_array
          let online_title_array = await readTitle(title, auth)
          // 如果json檔有新增的title就加入到online_title_array
          result_array.forEach(fanpage => {
            if (!online_title_array.includes(fanpage.title)) {
              online_title_array.push(fanpage.title)
            }
          });
          ```
      2. 將粉專追蹤人數能與整理過的粉專名稱做對應，並以是否第一次執行來做插入抓取日期插入或是取代的判定
          ```js
          // 再寫入trace(追蹤人數)
          let trace_array = []
          online_title_array.forEach(title => {
            let fanpage = result_array.find(fanpage => fanpage.title == title)
            if (fanpage) {
              trace_array.push([fanpage.trace])
            } else {
              trace_array.push([])
            }
          });
          // 抓取當天日期
          const datetime = new Date()

          if (online_title_array[0] !== title) {//如果判定是第一次就會在開頭插入
            online_title_array.unshift(title)
            trace_array.unshift([dateFormat(datetime, "GMT:yyyy/mm/dd")])
          } else {//如果不是第一次就取代
            trace_array[0] = [dateFormat(datetime, "GMT:yyyy/mm/dd")]
          }
          ```
      3. 將粉專名稱、追蹤人數寫入Google Sheets
          ```js
          // 寫入粉專名稱
          await writeTitle(title, online_title_array.map(title => [title]), auth)

          // 取得目前最後一欄
          let lastCol = await getLastCol(title, auth)
          // 寫入追蹤人數
          await writeTrace(title, trace_array, lastCol, auth)
          ```
執行程式
----
先在fb.json、ig.json裡面隨意修改，修改後於專案資料夾的終端機(Terminal)執行指令 **yarn start** 指令，等待爬蟲跑完後看看線上的Google Sheets是否有依照你的更改正確寫入Google Sheets  
* 下圖是我修改fb.json執行的範例  
    ![image](./article_img/googlesheets.png)

專案原始碼
----
完整的程式碼在[這裡](https://github.com/dean9703111/ithelp_30days/tree/master/day20)喔
你可以整個專案clone下來  
```
git clone https://github.com/dean9703111/ithelp_30days/tree/master.git
```
如果你已經clone過了，那你每天pull就能取得更新的資料嚕  
```
git pull origin master
cd day20
yarn
調整你.env檔填上 FB & IG 登入資訊、SPREADSHEET_ID
在credentials資料夾放上自己的憑證
yarn start
```
### [Day22 Google Sheets-業主：我希望新資料插在最前面](/day22/README.md)