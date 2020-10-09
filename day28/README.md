#### [回目錄](../README.md)
## Day28 為爬蟲加上通知 - 用 axois 發出 LINE 通知

在昨天用 POSTMAN 驗證 LINE Notify 的 api 可以使用後，今天我們就要在專案中增加發出 LINE 通知的功能

Node.js 中能實現這個目標的套件其實挺多的：[superagent](https://www.npmjs.com/package/superagent)、[got](https://www.npmjs.com/package/got)、[axios](https://www.npmjs.com/package/axios)...，`今天我們採用axios來實現這個需求`，如果你有興趣你也可以使用不同的套件來完成今天的功能
>PS.其實我一開始是用 [xmlhttprequest](https://www.npmjs.com/package/xmlhttprequest) 這個遠古套件完今天功能的
----

🏆 今日目標
----
### 1. axois 基礎介紹
1.1 安裝 / GET / POST 基礎用法
1.2 請求配置說明
### 2. 用 axois 發出 LINE 通知 

----

# 1. axois 基礎介紹

### 1.1 安裝 / GET / POST 基礎用法
* **安裝**
    ```vim
    npm install axios
    yarn add axios
    ```
* **GET 基礎用法**
    ```js
    const axios = require('axios'); // 引入套件
    axios.get('url/users', { // 填入 api 網址
        params: { // 傳入 params 物件
            ID: 12345
        }
    })
    .then(function (response) { 
        // 處理成功後要做的事
        console.log(response);
    })
    .catch(function (error) {
        // 發生意外地處理
        console.log(error);
    })
    ```
* **POST 基礎用法**
    ```js
    axios.post('url/users', { // 要傳送的資料由後方物件帶入
        firstName: 'Fred',
        lastName: 'Flintstone'
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
    ```
### 1.2 請求配置說明
* **axios 的組成結構**：
    ```js
    axios.(config 物件)
    .then(function (response) {})
    .catch(function (error) {});
    ```
* `config 物件`：發出 Request 的配置選項，其中只有 url 為必填
    ```js
    {
        // url 為必填
        url: '/users',

        // method 是發出 Request 時使用的方法
        method: 'get', // 默認為 get

        // baseURL 如果填寫就會被添加到 url 前面，除非 url 為絕對路徑
        baseURL: 'https://some-domain.com/api/',

        // 你可以在這個地方定義自己的 headers
        // 通常會拿來設定 Authorization、Content-Type
        headers: {'Content-Type': 'application/json'},

        // params 通常跟著 GET method 一起使用
        // 這裡填寫的參數會帶入 url 後面，ex : .../user?ID=123
        params: {
            ID: 123
        },

        // data 只適用於 POST、PUT、PATCH 這幾個 method
        // 主要作為 Request 傳送的資料
        data: {
            firstName: 'Fred'
        },

        // Request 時間超過 1000毫秒(1秒)後會被中止
        timeout: 1000,

        // 選項: 'arraybuffer', 'document', 'json', 'text', 'stream'
        // 瀏覽器才有 'blob'
        responseType: 'json', // 默認為 json

         // 限制 http 回應時的內容大小
        maxContentLength: 2000,
    }
    ```
    > 這裡只列出常用的配置選項，如果你有興趣深入研究請參考[官方文件](https://www.npmjs.com/package/axios#request-config)
* **使用 then 時，會得到如下回應**
    ```js
    axios.get('/users/123')
    .then(function(response) {
        console.log(response.data); // api 回傳的資料會在這裡
        console.log(response.status); // 這個是 HTTP狀態碼
        console.log(response.config); // 這個 Request 的 config
    });
    ```

----

# 2. 用 axois 發出 LINE 通知
在對 axois 有基礎了解後我們就把昨日在 POSTMAN 設定 Request 的參數搬移到專案程式吧，`在專案 tools 資料夾內新增 lineNotify.js`，今天我們要用這隻程式發出 LINE 通知

#### tools/lineNotify.js
```js
const axios = require('axios')
var FormData = require('form-data');
require('dotenv').config();

function lineNotify () {
    const token = process.env.LINE_TOKEN;
    
    // 使用 form-data 傳遞資料
    const form_data = new FormData();
    form_data.append("message", '測試 lineNotify');

    // 設定 LINE Notify 的 權杖 & form-data
    const headers = Object.assign({
        'Authorization': `Bearer ${token}`
    }, form_data.getHeaders());
    
    axios({
        method: 'post',
        url: 'https://notify-api.line.me/api/notify',
        data: form_data,
        headers: headers
    }).then(function (response) {
        // HTTP狀態碼 200 代表成功
        console.log("HTTP狀態碼:" + response.status);
        // 觀察回傳的資料是否與 POSTMAN 測試一致
        console.log(response.data);
    }).catch(function (error) {
        console.error("LINE通知發送失敗");
        if (error.response) { // 顯示錯誤原因            
            console.error("HTTP狀態碼:" + error.response.status);
            console.error(error.response.data);
        } else {
            console.error(error);
        }
    });
}
lineNotify() 
```

----

🚀 執行程式
----
在專案資料夾的終端機(Terminal)執行指令
```vim
node tools/lineNotify.js
```
確認印出的 HTTP狀態碼 & 回傳的資料與 POSTMAN 一致
![image](./article_img/terminal.png)
如果你的 LINE 收到發出的通知就代表你成功嚕！
![image](./article_img/lineMsg.png)

----

📖 參考資源
----
1. [由前端request 的幾種方法](https://medium.com/dot-js/%E7%94%B1%E5%89%8D%E7%AB%AFrequest-%E7%9A%84%E5%B9%BE%E7%A8%AE%E6%96%B9%E6%B3%95-fbf8a0b4023a)
2. [5 Ways to Make HTTP Requests in Node.js](https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html)
3. [axios 基本使用 & Config](https://ithelp.ithome.com.tw/articles/10212120)

### [Day29 為爬蟲加上通知 - 成功收到 LINE 通知爬蟲摘要訊息，專案大功告成！](/day26/README.md)