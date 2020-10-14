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
    * [Day1 技術只能陪你一陣子，學會解決問題才能過一輩子](/day1/README.md)
    * [Day2 開發環境大補帖 - Node.js、NVM、git、yarn、VSCode](/day2/README.md)

* 專案基礎知識
    * [Day3 努力寫出更好的程式碼，有時你不是一個人在戰鬥](/day3/README.md)
    * [Day4 建立Node.js專案 & 全面理解專案管家package.json](/day4/README.md)
    * [Day5 用yarn安裝及控管套件 & 善用關鍵字讓全世界的大神幫你一把](/day5/README.md)
    * [Day6 env-善用環境變數幫你快速遷移專案](/day6/README.md)
    * [Day7 gitignore-杜絕上傳錯誤資料，從此不再發生慘痛經驗](/day7/README.md)

* 網頁爬蟲
    * [Day8 selenium-webdriver：爬蟲起手式，帶你認識所見即所得的爬蟲工具](/day8/README.md)
    * [Day9 爬蟲第一步，FB先登入](/day9/README.md)
    * [Day10 關閉干擾爬蟲的彈窗，將FB粉專追蹤數納入囊中](/day10/README.md)
    * [Day11 舉一反三，帶你了解IG爬蟲不可忽略細節](/day11/README.md)
    * [Day12 合體吧！用一隻程式搞定FB、IG爬蟲](/day12/README.md)
    * [Day13 refactor-亂糟糟的房間沒人喜歡，程式也是](/day13/README.md)
    * [Day14 爬蟲執行時又又又崩潰了嗎？來點 try-catch 吧](/day14/README.md)
    * [Day15 json x 爬蟲 = 瑣事自動化，生命應該浪費在美好的事情上](/day15/README.md)
    * [Day16 不藏私，加上5行程式就能優化爬蟲的小技巧 ＆ 學會爬蟲，之後呢？](/day16/README.md)

* Google Sheets
    * [Day17 Google Sheets-免費儲存資料的好選擇，一起進入省錢起手式](/day17/README.md)
    * [Day18 Google Sheets-加入版控後被github警告了，官方範例做了什麼？](/day18/README.md)
    * [Day19 Google Sheets-你在文件迷路了嗎？用兩個處理Sheet的範例帶你攻略官方文件](/day19/README.md)
    * [Day20 Google Sheets-寫入爬蟲資料，跟 Copy & Paste 的日子說掰掰](/day20/README.md)
    * [Day21 Google Sheets-BUG!爬蟲資料塞錯位置 & 專案出包怎麼辦？](/day21/README.md)
    * [Day22 Google Sheets-業主：我希望新資料插在最前面 & 談需求變更](/day22/README.md)
    * [Day23 Google Sheets-優化格式，滿足客戶需求 & 談使用者體驗](/day23/README.md)

* 自動化
    * [Day24 排程-Cron套件超詳解，讓爬蟲自己動起來](/day24/README.md)
    * [Day25 排程-用forever套件來控管排程，背景執行才是王道！](/day25/README.md)
    * [Day26 排程-重開機後排程不見惹？簡單幾個步驟，從此以後完全自動](/day26/README.md)

* 通知設定
    * [Day27 為爬蟲加上通知 - 透過 POSTMAN 了解 LINE Notify 如何使用](/day27/README.md)
    * [Day28 為爬蟲加上通知 - 用 axios 發出 LINE 通知](/day28/README.md)
    * [Day29 為爬蟲加上通知 - 成功收到 LINE 通知爬蟲摘要訊息，專案大功告成！](/day29/README.md)

* 後話
    * [Day30 完賽心得 - 時間只是考驗，心中信念絲毫未減](/day30/README.md)

