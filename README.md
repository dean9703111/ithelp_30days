# 行銷廣告、電商小編的武器，FB & IG 爬蟲實戰從零開始

我認為程式設計不應該只是工程師專屬的武器  
而爬蟲的技術對於行銷、電商產業更是尤其重要  

我希望這些文章能真的幫助到想學習的朋友們，所以有任何不懂的請勇敢留言，我會盡力解惑  

往後的30天我盡我所能的將我的所學寫到文章中，內容包含：  
1. 撰寫程式的前置環境設定(windows/mac)，以及開發工具(IDE)
2. nodejs基礎操作
3. 抓取網頁資訊(打開虛擬網頁selenium、分析網頁、操作網頁元素)
4. 將取得的資訊放入Google sheets(與google sheets的溝通，write/update)
5. 排程自動執行
6. 執行完成後透過LINE回報執行狀況

我在這裡不會詳細解說每個語法或是工具，因為這些市面上太多資源在描述了，我會把這些資源附在每篇文章當中，有興趣的朋友可以去更伸一步的鑽研  
我在這裡的目標是希望你可以建立起一個思考邏輯的體系  
看到問題->拆解問題->分步驟處理  
一個大問題總可以解析成多個小問題，如果有不會的技術就去研究  
我文章的目標不是在於精通某一門技術，而是在於解決一個問題  
實戰經驗是本次挑戰要分享的重點  
沒有完美的邏輯以及厲害的演算法，我只為了解決問題  

## 三十天教學目錄

* 起源
    * [Day1 讓技術為你服務(說明專案目標，所涉及的技術領域)](/day1/README.md)
    * [Day2 前置環境設定(windows/mac)需要分開說明，並簡述各個工具的功能](/day2/README.md)

* 專案基礎知識
    * [Day3 nodejs起手式(只要做到Hello world)，package.json的script說明，並解釋最基礎函式執行邏輯](/day3/README.md)
    * Day4 .env環境變數說明，因為很多資訊需要社群登入後才能擷取，這個可以保證資訊的安全
    * Day5 gitignore，讓你只上傳需要用到的檔案到github    

* 網頁爬蟲
    * Day6 用nodejs成功打開虛擬網頁selenium(windows需要一些下載chrome的driver)，並說明使用理由(因為FB新版api對隱私權很看重所以很難用api進行爬蟲)
    * Day7 分析Facebook網頁結構，打造自動登入FaceBook的機器人
    * Day8 分析Facebook網頁結構，並取得追蹤人數資訊
    * Day9 分析Instagram網頁結構，打造自動登入Instagram的機器人
    * Day10 分析Instagram網頁結構，並取得追蹤人數資訊
    * Day11 解決selenium跨網域問題、通知彈窗問題
    * Day12 json簡易說明，將你需要爬蟲的網頁存到json裡面

* 優化程式
    * Day13 程式重構(1)
    * Day14 程式重構(2)

* 連結Google sheet
    * Day15 取得寫入google sheets的權杖(token)
    * Day16 判斷google sheets存在與否並自動創建
    * Day17 如何將得到的資料寫入google sheets
    * Day18 google sheets窗口凍結
    * Day19 google sheets重投插入欄位
    * Day20 如何將讀取google sheets的資訊並放入正確資料
    * Day21 google sheets欄位寬度調整

* 自動化
    * Day22 排程設定
    * Day23 透過環境變數以及重構程式決定執行排程或是執行單次
    * Day24 排程如何永久背景執行

* 通知設定
    * Day25 LINE權杖取得
    * Day26 nodejs如何使用https的POST
    * Day27 LINE訊息撰寫
    * Day28 在完成後call LINE通知的function提醒使用者

* 後話
    * Day29 README的撰寫，簡單說明常用的markdown語法
    * Day30 總結

