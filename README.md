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

我在這裡不會詳細解說每個語法或是工具，因為這些市面上太多資源在描述了，我會把這些資源附在每篇文章當中，有興趣的朋友可以去更深一步的鑽研  
我在這裡的目標是希望你可以建立起一個思考邏輯的體系  
看到問題->拆解問題->分步驟處理  
一個大問題總可以解析成多個小問題，如果有不會的技術就去研究  
我文章的目標不是在於精通某一門技術，而是在於帶你實際體驗如何完成一個專案  
實戰經驗是本次挑戰要分享的重點  
沒有完美的邏輯以及厲害的演算法，我只為了解決問題  
文章內所用到的技術不只是單純的爬蟲，而是把相關的技術做整合使專案更實用  

## 三十天教學目錄

* 起源
    * [Day1 技術陪你一陣子，邏輯陪你一輩子](/day1/README.md)
    * [Day2 工欲善其事，必先利其器，coding環境大補帖](/day2/README.md)

* 專案基礎知識
    * [Day3 什麼是好的程式碼](/day3/README.md)
    * [Day4 開始Node.js旅程](/day4/README.md)
    * [Day5 yarn-讓全世界的大神幫你一把，如何安裝及控管套件](/day5/README.md)
    * [Day6 env-善用環境變數幫你做到快速遷移專案](/day6/README.md)
    * [Day7 gitignore-請勿上傳敏感、主程式以外的資料](/day7/README.md)

* 網頁爬蟲
    * [Day8 selenium-爬蟲起手式](/day8/README.md)
    * [Day9 分析Facebook網頁結構，打造自動登入FaceBook的機器人](/day9/README.md)
    * [Day10 關閉擾人彈窗，分析FB粉專結構並取得追蹤人數資訊](/day10/README.md)
    * [Day11 依樣畫葫蘆，完成Instagram登入並取得追蹤人數](/day11/README.md)
    * [Day12小孩子才選擇，我要一隻程式爬完FB & IG粉專](/day12/README.md)
    * [Day13 refactor-重構程式碼，讓合作夥伴對你比讚](/day13/README.md)
    * [Day14 try & catch讓程式更穩定](/day14/README.md)
    * [Day15 善用json讓你批量爬蟲](/day15/README.md)
    * [Day16 優化爬蟲體驗 && 思路分享](/day16/README.md)

* Google Sheets
    * [Day17 Google Sheets-起手式，取得寫入google sheets的憑證(credentials)](/day17/README.md)
    * [Day18 Google Sheets-讀取自己的sheet](/day18/README.md)
    * [Day19 Google Sheets-判斷Sheet存在與否並自動創建](/day19/README.md)
    * [Day20 Google Sheets-將爬蟲資料寫入](/day20/README.md)
    * [Day21 Google Sheets-每日爬蟲，讓新資料塞入正確的欄位](/day21/README.md)
    * [Day22 Google Sheets-倒序插入](/day22/README.md)
    * [Day23 Google Sheets-窗口凍結 & 欄位寬度調整](/day23/README.md)

* 自動化
    * [Day24 排程設定](/day24/README.md)
    * [Day25 排程永久背景執行?json改了沒反應?](/day25/README.md)
    * [Day26 windows & mac 手把手排程設定](/day26/README.md)

* 通知設定
    * Day27 LINE權杖取得，用POSTMAN測試
    * Day28 nodejs如何使用https的POST
    * Day29 重構程式整合訊息，用LINE通知提醒使用者

* 後話
    * [Day30 總結](/day/30/README.md)

