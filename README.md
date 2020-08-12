# 行銷廣告、電商小編的武器，FB & IG 爬蟲實戰從零開始

程式設計不該只是工程師專屬的武器
爬蟲的技術對於身處行銷、電商產業的人更重要

文章並不探討困難的技術，目標是培養解決問題的能力及技術的整合，內容包含：
1. 撰寫程式的前置環境設定，以及推薦開發工具(IDE)
2. nodejs基礎操作
3. 自動抓取網頁資訊(打開虛擬網頁、分析網頁、操作網頁元素)
4. 將取得的資訊放入Google Sheets(read、write、format...)
5. 排程自動執行設定，腳本撰寫
6. 執行完成後透過LINE回報執行狀況

備註：本專案在windows、mac皆可操作

我在這裡不會詳細解說每個語法或是工具，因為這些市面上太多資源在描述了，我會把這些資源附在每篇文章當中，有興趣的朋友可以去更伸一步的鑽研  
我在這裡的目標是希望你可以建立起一個思考邏輯的體系  
看到問題->拆解問題->分步驟處理  
一個大問題總可以解析成多個小問題，如果有不會的技術就去研究  
我文章的目標不是在於精通某一門技術，而是在於解決一個問題  
實戰經驗是本次挑戰要分享的重點  
沒有完美的邏輯以及厲害的演算法，我只為了解決問題  
文章內所用到的技術不只是單純的爬蟲，而是把相關的技術做整合使專案更實用  

## 三十天教學目錄

* 起源
    * [Day1 讓技術為你服務(說明專案目標，所涉及的技術領域)](/day1/README.md)
    * [Day2 前置環境設定(windows/mac)需要分開說明，並簡述各個工具的功能](/day2/README.md)

* 專案基礎知識
    * [Day3 nodejs起手式(只要做到Hello world)，package.json的script說明，並解釋最基礎函式執行邏輯](/day3/README.md)
    * [Day4 .env環境變數說明，因為很多資訊需要社群登入後才能擷取，這個可以保證資訊的安全](/day4/README.md)
    * [Day5 gitignore，讓你只上傳需要用到的檔案到github](/day5/README.md)

* 網頁爬蟲
    * [Day6 用nodejs成功打開虛擬網頁selenium(windows需要一些下載chrome的driver)，並說明使用理由(因為FB新版api對隱私權很看重所以很難用api進行爬蟲)](/day6/README.md)
    * [Day7 分析Facebook網頁結構，打造自動登入FaceBook的機器人](/day7/README.md)
    * [Day8 關閉擾人彈窗，分析FB粉專結構並取得追蹤人數資訊](/day8/README.md)
    * [Day9 依樣畫葫蘆，完成Instagram登入並取得追蹤人數](/day9/README.md)
    * [Day10 小孩子才選擇，我要一隻程式爬完FB & IG粉專](/day10/README.md)
    * [Day11 重構程式碼，讓合作夥伴對你比讚](/day11/README.md)
    * [Day12 try & catch讓程式更穩定](/day12/README.md)
    * [Day13 json讓你大量爬蟲](/day13/README.md)
    * [Day14 優化爬蟲體驗 && 思路分享](/day14/README.md)

* Google Sheets
    * [Day15 Google Sheets-起手式，取得讀寫權杖(token)](/day15/README.md)
    * [Day16 Google Sheets-讀取自己的sheet](/day16/README.md)
    * Day17 Google Sheets-判斷Sheet存在與否並自動創建
    * Day18 Google Sheets-將爬蟲資料寫入
    * Day19 Google Sheets-每日爬蟲，如何讓新資料塞入正確的欄位
    * Day20 Google Sheets-插入欄位
    * Day21 google sheets-窗口凍結 & 欄位寬度調整

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

