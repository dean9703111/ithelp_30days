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
    * [Day1 技術只能陪你一陣子，學會解決問題才能過一輩子](https://ithelp.ithome.com.tw/articles/10233268)
    * [Day2 開發環境大補帖 - Node.js、NVM、git、yarn、VSCode](https://ithelp.ithome.com.tw/articles/10238321)

* 專案基礎知識
    * [Day3 努力寫出更好的程式碼，有時你不是一個人在戰鬥](https://ithelp.ithome.com.tw/articles/10239089)
    * [Day4 建立Node.js專案 & 全面理解專案管家package.json](https://ithelp.ithome.com.tw/articles/10239752)
    * [Day5 用yarn安裝及控管套件 & 善用關鍵字讓全世界的大神幫你一把](https://ithelp.ithome.com.tw/articles/10240439)
    * [Day6 env-善用環境變數幫你快速遷移專案](https://ithelp.ithome.com.tw/articles/10241057)
    * [Day7 gitignore-杜絕上傳錯誤資料，從此不再發生慘痛經驗](https://ithelp.ithome.com.tw/articles/10241730)

* 網頁爬蟲
    * [Day8 selenium-webdriver：爬蟲起手式，帶你認識所見即所得的爬蟲工具](https://ithelp.ithome.com.tw/articles/10241791)
    * [Day9 爬蟲第一步，FB先登入](https://ithelp.ithome.com.tw/articles/10242625)
    * [Day10 關閉干擾爬蟲的彈窗，將FB粉專追蹤數納入囊中](https://ithelp.ithome.com.tw/articles/10243683)
    * [Day11 舉一反三，帶你了解IG爬蟲不可忽略細節](https://ithelp.ithome.com.tw/articles/10243874)
    * [Day12 合體吧！用一隻程式搞定FB、IG爬蟲](https://ithelp.ithome.com.tw/articles/10243941)
    * [Day13 refactor-亂糟糟的房間沒人喜歡，程式也是](https://ithelp.ithome.com.tw/articles/10243960)
    * [Day14 爬蟲執行時又又又崩潰了嗎？來點 try-catch 吧](https://ithelp.ithome.com.tw/articles/10243972)
    * [Day15 json x 爬蟲 = 瑣事自動化，生命應該浪費在美好的事情上](https://ithelp.ithome.com.tw/articles/10244326)
    * [Day16 不藏私，加上5行程式就能優化爬蟲的小技巧 ＆ 學會爬蟲，之後呢？](https://ithelp.ithome.com.tw/articles/10244446)

* Google Sheets
    * [Day17 Google Sheets-免費儲存資料的好選擇，一起進入省錢起手式](https://ithelp.ithome.com.tw/articles/10244557)
    * [Day18 Google Sheets-加入版控後被github警告了，官方範例做了什麼？](https://ithelp.ithome.com.tw/articles/10244569)
    * [Day19 Google Sheets-你在文件迷路了嗎？用兩個處理Sheet的範例帶你攻略官方文件](https://ithelp.ithome.com.tw/articles/10246473)
    * [Day20 Google Sheets-寫入爬蟲資料，跟 Copy & Paste 的日子說掰掰](https://ithelp.ithome.com.tw/articles/10247562)
    * [Day21 Google Sheets-BUG!爬蟲資料塞錯位置 & 專案出包怎麼辦？](https://ithelp.ithome.com.tw/articles/10248227)
    * [Day22 Google Sheets-業主：我希望新資料插在最前面 & 談需求變更](https://ithelp.ithome.com.tw/articles/10248352)
    * [Day23 Google Sheets-優化格式，滿足客戶需求 & 談使用者體驗](https://ithelp.ithome.com.tw/articles/10249403)

* 自動化
    * [Day24 排程-Cron套件超詳解，讓爬蟲自己動起來](https://ithelp.ithome.com.tw/articles/10249462)
    * [Day25 排程-用forever套件來控管排程，背景執行才是王道！](https://ithelp.ithome.com.tw/articles/10250083)
    * [Day26 排程-重開機後排程不見惹？簡單幾個步驟，從此以後完全自動](https://ithelp.ithome.com.tw/articles/10250811)

* 通知設定
    * [Day27 為爬蟲加上通知 - 透過 POSTMAN 了解 LINE Notify 如何使用](https://ithelp.ithome.com.tw/articles/10251217)
    * [Day28 為爬蟲加上通知 - 用 axios 發出 LINE 通知](https://ithelp.ithome.com.tw/articles/10251419)
    * [Day29 為爬蟲加上通知 - 成功收到 LINE 通知爬蟲摘要訊息，專案大功告成！](https://ithelp.ithome.com.tw/articles/10251647)

* 後話
    * [Day30 完賽心得 - 時間只是考驗，心中信念絲毫未減](https://ithelp.ithome.com.tw/articles/10252816)

