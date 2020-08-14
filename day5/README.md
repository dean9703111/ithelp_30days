#### [回目錄](../README.md)
## Day5 請誤上傳敏感、主程式以外的資料

今天介紹一個好用的東西 **.gitignore**，他是一份忽略清單，通常忽略清單上的都是不需要加入版本控制的檔案  
常見在忽略清單的檔案類型如下：
1. 機敏性資料(資料庫帳號密碼、存取權限的權杖(token)、憑證(credentials)...)
2. 環境變數(.env檔，裡面通常存有ip、port...等環境參數)
3. 套件資料夾(node_module、vendor...)
4. 日誌檔案(.log相關紀錄)
5. 程式編譯時產生的檔案(快取檔案、暫存檔案、編譯結果)

透過這份清單，大家可以想一下昨天的專案有哪些檔案及資料夾是要加入這份忽略清單的呢  

.gitignore使用時機 & 範例
----

1. 上一篇有提到我們這次的爬蟲會用FB & IG 的帳號及密碼還有你google sheet的id，**這些資訊我們統一設定在.env環境變數裡面**，我相信大家都不希望把這些機敏資訊放到git外流出去  
2. 另外我們**透過yarn安裝的dotenv套件也產生了一個node_modules的資料夾**，從經以後你所安裝的套件都會儲存到這個資料夾裡面，通常一個中型專案套件他的大小都高達300MB以上，所以這個node_modules的資料夾是不適合上傳到到git的(這些套件到新環境下指令yarn就能安裝)  

整理一下你的忽略清單會長這樣
#### .gitignore
```
node_modules
.env
```
VSCode觀察.gitignore調整前後
----
如果你也是用VSCode當成編輯器，你可以觀察使用.gitignore的前後變化
* 使用.gitignore前.env及node_modules會被列入變更(綠色的字代表有新增的檔案，棕色的字代表有改變的檔案)  
    <img src="./article_img/vscode2.png" width="160" height="210"/>
    <img src="./article_img/vscode3.png" width="160" height="220"/>  

* 使用.gitignore後.env及node_modules會變成淺灰色，代表不會被列入變更
    <img src="./article_img/vscode1.png" width="160" height="210"/>  

**這份忽略清單會隨著你專案的變動而調整**，如果你在撰寫其他種類程式語言可以參考[這個網站](https://github.com/github/gitignore)來調整自己的.gitignore  

>**筆者碎碎念** 
在文章的最後我分享一下.gitignore的重要性
我目前在公司兼職MIS，公司內部有架一個gitlab提供內部使用
但每個人對git使用的習慣相差很大，有個部門的同事根本就沒在管什麼.gitignore，每次push都上傳一大包(各種執行檔、暫存檔全部上傳，根本把git當成NAS在用...)  
因為git版本控管的特性，他的專案在gitlab就越來越肥  
儘管跟他溝通很多次這樣程式的寫法很有問題但都被當成耳邊風   
直到有一天gitlab的硬碟終於被他用完了...(他一個專案就用了15GB的容量)他才開始正視.gitignore的重要性  
請正確的使用git來做版本控管，不要上傳多餘的資料到git上面，他們只會造成你觀察每個版本變更時的閱讀障礙  

專案原始碼
----
上面這的程式碼可以在[這裡](https://github.com/dean9703111/ithelp_30days/day5)找到喔
你可以整個專案clone下來  
```
git clone https://github.com/dean9703111/ithelp_30days.git
```
如果你已經clone過了，那你每天pull就能取得更新的資料嚕  
```
git pull origin master
cd day5
yarn start
```
### [Day6 爬蟲起手式selenium](../day6/README.md)