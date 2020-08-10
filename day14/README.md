#### [回目錄](../README.md)
### Day14 優化爬蟲體驗

原則上我們已經完成爬蟲這一段的功能了，接下來是處理優化的部分  
前面[Day11 重構程式碼](../day15/README.md)讓你開發上更有效率，而優化是一個非常複雜的問題，常見需要的優化如：
1. 更好地執行效率
2. 使用更少的記憶體
3. 使用者操作難易度
...  

優化是一條沒有盡頭的路，我相信除了我所提出的優化方案外，一定還有很多是我所忽略的，歡迎大家腦力激盪提供想法  

* 首先我想到的是我所分析的內容都跟圖片無關，但偏偏**最浪費流量及載入時間的都是圖片**，所以我在chrome這個瀏覽器增加了下面的配置便可有以下好處：
    1. 減少瀏覽器使用流量
    2. 減少瀏覽器載入時間
#### initDrive.js
```js
options.addArguments('blink-settings=imagesEnabled=false')//不加載圖片提高效率
```
你加上後跑爬蟲可以很明顯的感受到速度變快很多，跑起來可看到所有圖片都沒有載入(下圖)  
![image](./article_img/no_img.png)  

* 在每個爬蟲的步驟及功能都很穩定後，其實我不需要這個視窗來看他的動作了，背景跑就夠惹
#### initDrive.js
```js
options.addArguments('--headless')//瀏覽器不提供頁面觀看，linux下如果系統是純文字介面不加這條會啓動失敗
// 下面三個建議一起加入，因為有朋友遇到一些奇怪錯誤
options.addArguments('--no-sandbox')//取消沙盒模式
options.addArguments('--disable-dev-shm-usage')//使用共享內存RAM
options.addArguments('--disable-gpu')//規避部分bug
```
設定完這些後執行程式是不是就不會跳出瀏覽器了呢?  
[這篇文章](https://stackoverflow.max-everyday.com/2019/12/selenium-chrome-options/)有提供selenium啓動Chrome的進階配置參數，對效能有狂熱的朋友們可以來仔細研究看看    
到目前為止本專案已經完成爬蟲部分的程式，接下來的目標是把這些資料存放到Google sheet讓你可以在任何地方打開觀看  

優化過的程式碼在[這裡](https://github.com/dean9703111/ithelp_30days/day14)喔
你可以整個專案clone下來  
```
git clone https://github.com/dean9703111/ithelp_30days.git
```
如果你已經clone過了，那你每天pull就能取得更新的資料嚕  
```
git pull origin master
cd day14
調整你.env檔填上 FB & IG 登入資訊
yarn
yarn start
```
### [Day15 Try & Catch讓程式更穩定](../day15/README.md)