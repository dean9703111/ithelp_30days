#### [回目錄](../README.md)
### Day16 Google Sheets-讀取自己的sheet

昨天跟著教學做就能讀取到Google提供的範例sheet  

今天我們有幾個目標是能夠讓程式讀取自己指定的Google Sheets，首先要理解Google提供範例程式，理解程式最快的方式的就是從**輸出結果的位置**開始回推，所以我反推的順序會是：
1. 找到輸出結果的console.log()位置 &rarr; *console.log('Name, Major:');*
2. 確認是用哪個function來輸出 &rarr; *listMajors(auth)*
3. 是誰call這個function &rarr; *authorize(JSON.parse(content), listMajors)*
4. 首先要取得憑證才能夠授權 &rarr; *fs.readFile('credentials/googleSheets.json'*

### 取得spreadsheetId
所以我們需要來改寫listMajor這隻函式來讀取自己的Google Sheets，改寫前需要先建立給爬蟲用的Google Sheets並取得spreadsheetId(在Google Sheets網址中.../d/XXXXX/edit...的XXXXX那段，如下圖紅框處)  
![image](./article_img/googlesheet_url.png)  
把spreadsheetId複製起來放到.env裡面設定為環境變數
.env.exmaple
```
#填寫自己登入IG的真實資訊(建議開小帳號，因為如果爬蟲使用太頻繁你的帳號會被鎖住)
IG_USERNAME='ig username'
IG_PASSWORD='ig password'

#填寫自己登入FB的真實資訊(建議開小帳號，因為如果爬蟲使用太頻繁你的帳號會被鎖住)
FB_USERNAME='fb username'
FB_PASSWORD='fb password'

#填寫你目標放入的spreadsheetId
SPREADSHEET_ID='your spreadsheetId'
```
### 撰寫listMySheet讀取自己的sheet
在這裡我們把原本Google範例程式的listMajors刪除，改寫成自己的listMySheet函式  
如果你對抓取出來的valueRenderOption類型感興趣可參考[Google官方文件](https://developers.google.com/sheets/api/reference/rest/v4/ValueRenderOption)
```js
async function listMySheet (auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  const title = '我的sheet'//請你更改成自己設定的sheet(工作表)名稱
  const request = {
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: [
      `'${title}'!A:ZZ`//這是指抓取的範圍，你也可以改寫成A1:A300(抓第1欄的第1列到第300列)
    ],
    valueRenderOption: "FORMULA"//FORMATTED_VALUE|UNFORMATTED_VALUE|FORMULA
  }
  try {
    //這裡改寫為await，之後會有順序執行的需求
    let values = (await sheets.spreadsheets.values.get(request)).data.values;
    console.log(values)
  } catch (err) {
    console.error(err);
  }
}
```


完整的程式碼在[這裡](https://github.com/dean9703111/ithelp_30days/day16)喔
你可以整個專案clone下來  
```
git clone https://github.com/dean9703111/ithelp_30days.git
```
如果你已經clone過了，那你每天pull就能取得更新的資料嚕  
```
git pull origin master
cd day16
yarn
在credentials資料夾放上自己的憑證
node tools/googleSheets.js
```
### [Day17 Google Sheets-讀取自己的sheet](/day17/README.md)