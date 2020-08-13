#### [回目錄](../README.md)
### Day18 Google Sheets-將爬蟲資料寫入

過去我們只將FB粉專、IG粉專的資訊用console.log輸出，現在我們要把這些資料儲存到Google Sheets需要有幾個步驟：
1. 將FB粉專、IG粉專的追蹤人數填到result_array並return
2. 將fb_result_array、ig_result_array提供給updateGoogleSheets當參數
3. 先在第一欄寫入title(粉專名稱)、再寫入trace(追蹤人數)

不知道昨天有沒有人看官方的教學文件呢?今天我一樣先提供[官方教學](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update)建議大家可以先透過官方教學嘗試看看有沒有辦法獨立完成喔～如果你只是要updateSheet的功能，你只需要看下面這個函式即可  
```js
let title = '你的sheet title'
//Google Sheets能吃的array格式範例
let array = [['test1'],['test2'],['test3'],['test4']]
async function writeSheet (title, array, auth) {//auth為憑證通過後取得
  const sheets = google.sheets({ version: 'v4', auth });
  const request = {
    spreadsheetId: process.env.SPREADSHEET_ID,
    valueInputOption: "USER_ENTERED",//寫入格式的分類有：INPUT_VALUE_OPTION_UNSPECIFIED|RAW|USER_ENTERED
    range: [
      `'${title}'!A:A`//title是sheet的標題，A:A是能寫入的範圍
    ],
    resource: {
      values: array
    }
  }
  try {
    await sheets.spreadsheets.values.update(request);//執行後即完成Google Sheets更新
    console.log(`updated ${title} title`);
  } catch (err) {
    console.error(err);
  }
}
```

將爬蟲資料寫入
----
大腦想起來的步驟不多，但實作起來你發現要注意的細節超級多QQ，下面是我撰寫的邏輯思路以及每個函式的作用：
* 首先爬蟲程式中的 **crawlerFB、crawlerIG** 這兩個的函式都需要return最終每個粉專的追蹤人數(result_array)
  ```js
  async function crawlerFB (driver, By, until) {
      const isLogin = await loginFacebook(driver, By, until)
      if (isLogin) {//如果登入成功才執行下面的動作
          console.log(`FB開始爬蟲`)
          let result_array = []
          for (fanpage of fanpage_array) {
              let trace
              try {
                  await goFansPage(driver, fanpage.url)
                  trace = await getTrace(driver, By, until)
                  if (trace === null) {
                      console.log(`${fanpage.title}無法抓取追蹤人數`)
                  } else {
                      console.log(`${fanpage.title}追蹤人數：${trace}`)
                  }
                  await driver.sleep(Math.floor(Math.random()*5)+1)//建議每個粉絲專頁爬蟲產生亂數間隔1~6秒，不然很有可能被鎖帳號
              } catch (e) {
                  console.error(e);
                  continue;
              } finally {
                  result_array.push({
                      url: fanpage.url,
                      title: fanpage.title,
                      trace: trace
                  })
              }
          }
          return result_array
      }
  }
  ```
* 主程式index.js要把回傳的result_array傳給updateGoogleSheets當參數
```js
const ig_result_array = await crawlerIG(driver, By, until)
const fb_result_array = await crawlerFB(driver, By, until)
driver.quit();
//處理Google Sheets相關動作
await updateGoogleSheets(ig_result_array, fb_result_array)
```
* googleSheets.js 的 **writeSheet** 函式將資料寫進去
  1. 第一欄寫入title(粉專名稱)
      1. 把result_array中的title抽出來變成陣列
      2. 將該sheet的title插入到陣列最前面
      3. 執行 **writeTitle** 更新sheet第一欄的資料
  2. trace(追蹤人數)依序向右欄位新增
      1. 執行 **getLastCol** 取得有資料的最後一欄，因為要插入在最後面
      2. 把result_array中的trace抽出來變成陣列
      3. 抓當日時間插入到陣列最前面
      4. 執行 **writeTrace** 插入資料到sheet的最後面

這部分程式我從googleSheets.js抽出來讓大家理解一下
```js
async function writeSheet (title, result_array, auth) {
  // 先在第一欄寫入title(粉專名稱)
  let title_array = result_array.map(fanpage => [fanpage.title]);
  // 填上名稱
  title_array.unshift([title])//unshift是指插入陣列開頭
  await writeTitle(title, title_array, auth)

  // 取得目前最後一欄
  let lastCol = await getLastCol(title, auth)

  // 再寫入trace(追蹤人數)
  let trace_array = result_array.map(fanpage => [fanpage.trace]);
  // 抓取當天日期
  const datetime = new Date()
  trace_array.unshift([dateFormat(datetime, "GMT:yyyy/mm/dd")])
  await writeTrace(title, trace_array, lastCol, auth)
}

async function writeTitle (title, title_array, auth) {//title都是寫入第一欄
  const sheets = google.sheets({ version: 'v4', auth });
  const request = {
    spreadsheetId: process.env.SPREADSHEET_ID,
    valueInputOption: "USER_ENTERED",// INPUT_VALUE_OPTION_UNSPECIFIED|RAW|USER_ENTERED
    range: [
      `'${title}'!A:A`
    ],
    resource: {
      values: title_array
    }
  }
  try {
    await sheets.spreadsheets.values.update(request);
    console.log(`updated ${title} title`);
  } catch (err) {
    console.error(err);
  }
}

function toColumnName (num) {//Google Sheets無法辨認數字欄位，需轉為英文才能使用
  for (let ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
    ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
  }
  return ret;
}

async function getLastCol (title, auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  const request = {
    spreadsheetId: process.env.SPREADSHEET_ID,
    ranges: [
      `'${title}'!A1:ZZ1`
    ],
    majorDimension: "COLUMNS",
  }
  try {
    let values = (await sheets.spreadsheets.values.batchGet(request)).data.valueRanges[0].values;
    // console.log(title + " StartCol: " + toColumnName(values.length + 1))
    return toColumnName(values.length + 1)
    // return web_name_array
  } catch (err) {
    console.error(err);
  }
}
async function writeTrace (title, trace_array, lastCol, auth) {//trace則是一直往後寫
  const sheets = google.sheets({ version: 'v4', auth });
  const request = {
    spreadsheetId: process.env.SPREADSHEET_ID,
    valueInputOption: "USER_ENTERED",// INPUT_VALUE_OPTION_UNSPECIFIED|RAW|USER_ENTERED
    range: [
      `'${title}'!${lastCol}:${lastCol}`
    ],
    resource: {
      values: trace_array
    }
  }
  try {
    await sheets.spreadsheets.values.update(request);
    console.log(`updated ${title} trace`);
  } catch (err) {
    console.error(err);
  }
}

async function updateGoogleSheets (ig_result_array, fb_result_array) {
  fs.readFile('credentials/googleSheets.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content), async (auth) => {
      let sheets = await checkSheet(auth)
      for (sheet of sheets) {
        if (sheet.title === 'FB粉專') {
          writeSheet(sheet.title, fb_result_array, auth)
        } else if (sheet.title === 'IG帳號') {
          writeSheet(sheet.title, ig_result_array, auth)
        }
      }
    });
  });
}
```
![image](./article_img/googlesheet.png)
目前為止將爬蟲寫入Google Sheets的動作已經完成了，大家可以思考一下還有什麼東西是我們忽略的呢？有什麼狀況會造成錯誤？希望大家在下方提供自己的想法喔～  

完整的程式碼在[這裡](https://github.com/dean9703111/ithelp_30days/day18)喔
你可以整個專案clone下來  
```
git clone https://github.com/dean9703111/ithelp_30days.git
```
如果你已經clone過了，那你每天pull就能取得更新的資料嚕  
```
git pull origin master
cd day18
yarn
在credentials資料夾放上自己的憑證
yarn start
```
### [Day19 Google Sheets-每日爬蟲，讓新資料塞入正確的欄位](/day19/README.md)