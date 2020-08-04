#### [回目錄](../README.md)
### Day4 程式的環境變數

如果你曾經有撰寫網頁端的經驗，你也許體會過以下狀況
1. 某些function只能在測試環境中使用，正式環境禁止執行
2. 資料庫搬移到新環境，ip、username、password都需要修正
3. 這份專案由多人維護，每個人都有個別的設定
4. 專案在不同伺服器儲存的位置不一樣
5. ...

簡單來說，環境變數的主要功能
1. 用來區分正式/測試環境
2. 設定重要不得外流的資料(資料庫帳號、密碼，使用者權杖...)
3. 需要統一設定的變數內容(系統ip、網址、port...)

不過今天講的是爬蟲，所以大家可以想一下以爬蟲來說有哪些資訊是需要放在環境變數的呢？

----

經過個人的測試後我發現以下是需要放進環境變數的資料  
1. **FB & IG的帳號密碼**
原本我想要使用 FB & IG 提供的 api 來抓取我想要的追蹤者人數即每日發文篇數等等資訊，但實際研究後發現由於隱私安全相關問題，所以他們提供的api只能查自己有權限的粉專，所以我**放棄使用官方api 改用 selenium 網頁模擬器**來做爬蟲，在實際操作中發現以下規則，所以只能使用真實存在的帳戶來作為爬蟲帳戶:
    + FB 部分粉專必須要登入後才能觀看
    + IG則是全部都要登入，部分粉專要按追蹤才能觀看    
2. **google sheet的id**
比起產生一份excel文件，我認為雲端的google sheet是更好的方法
3. **爬蟲時間**
因為爬蟲時間可能每個人都不一樣，所以把他列為可變參數

以下為環境變數的範例檔
##### .env.exmaple
```
#填寫你目標放入的sheet id
SPREADSHEET_ID='your sheet id'

#你FB及IG的帳號密碼(建議用小帳號)
IG_USERNAME='ig username'
IG_PASSWORD='ig password'
FB_USERNAME='fb username'
FB_PASSWORD='fb password'

#這是設定排程的時間參數(目前預設每日22:30準時執行)
CRONJOB_TIME='0 30 20 * * *'
```
實作上你需要將他複製一份到.env檔到你的專案資料夾，並填上自己的資訊

### 那我們實際上要怎麼在node.js專案中讀取.env裡面的資料呢?
我們需要安裝一個dotenv的套件來抓.env的資料
```
yarn add dotenv
```
接者編輯index.js的程式
##### index.js
```js
require('dotenv').config(); //載入.env環境檔
function getEnvVariable () {
    const env_variable= process.env.YOUR_VARIABLE // 取出環境變數
    console.log(env_variable)
}
getEnvVariable()
```
設定環境檔內容
##### .env
```
YOUR_VARIABLE='這是環境變數'
```
在terminal執行指令
```
yarn start
```
如果有輸出"這是環境變數"的字串就代表你成功嚕～
