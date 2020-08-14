#### [回目錄](../README.md)
## Day2 工欲善其事，必先利其器

>**筆者碎碎念**  
我想先分享一個心態，無論是面對工作還是外包都一樣  
無論在面試工作或是談外包時要先衡量一下自己的實力  
如果你即將要面對的工作(外包)已經遠遠超過了你的能力範圍  
強烈建議你拒絕這個機會，不要把工作(外包)當成是一個給你練習基礎的地方  
你的同事跟業主會恨你的  
尤其是外包，如果你的基礎不穩，運氣好你可能會做出一個貌似可以用的專案  
但實際上這個專案充滿著你所不知道的漏洞  
這塊我想只有實際在業界磨練過一段時間才能比較感同身受

我周圍有些人在面對需求時很喜歡寫一些市面上已經提供的套件而不是直接使用它(而且他們寫出來的套件bug通常比原版多很多...)  
在個人的開發經驗中有97%以上的套件我是看過說明文檔就去使用，只有3%會去看這份套件到底怎麼寫  
會去看他怎麼寫通常不是因為他寫的太好，而是他寫的很爛bug一堆影響到功能需要去修正或者評估使用其他解法

**請不要重複造輪子**，這是我今天這篇文章要表達的核心意義，解決問題的效率才是最重要的  
EX:你需要了解怎麼使用電腦，但你不需要去學習怎麼做出一台電腦

講了這麼多垃圾話終於要開始今天的重點了

承接昨天列出的步驟，今天我們從**使用什麼工具完成**開始說起  
>
1. **使用什麼工具完成**
2. ~~列出功能項目報價(因為報價比較私人，這塊在系列文不會介紹)~~
3. 哪個功能項目需要最先研究
4. 如何讓對方能夠使用及測試功能
5. 預計交期

使用什麼工具完成
----
說到爬蟲，我想絕大多數的人第一個想到的一定是python  
python是一個很好的語言，但很可惜我對他的鑽研不夠深入  
如果這份外包**使用一個自己不夠熟悉的語言來撰寫那是一個不負責任的行為**  
所以在這裡我選擇的語言是javacscript  

另外我會詳細說明前置環境的設定  
如果每個人的環境設置都不一樣  
那麼我文章的程式可能在許多電腦上都是無法執行的  
所以環境的前置作業這塊包含windows/mac兩個系統的設定  
讓你們了解到為什麼叫使用這些工具  

1. nodejs
2. NVM
3. git
4. yarn
5. VSCode

<hr>

nodejs [官網](https://nodejs.org/en/about/)
----
<img src="./article_img/nodejs.png" width="120" height="80"/>

可以在server端執行的javascript，前端工程師的福音  

nvm [官網](https://github.com/nvm-sh/nvm)
----
由於nodejs更新速度是非常快的，而許多套件有nodejs版本的相依性，透過NVM你可以輕鬆切換nodejs版本來符合不同專案的使用環境  

[windows下載頁面](https://github.com/coreybutler/nvm-windows/releases/download/1.1.7/nvm-noinstall.zip)、[windows官方介紹](https://github.com/coreybutler/nvm-windows)   

mac建議先下載Homebrew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
下載後安裝nvm
```
brew install nvm
```

##### 下載後nvm後及可輕鬆安裝node.js
```
nvm install 14.7
```
如果你有興趣研究更多nvm可以參考這篇[nvm：快速安裝、切換不同版本的 Node.js](https://ithelp.ithome.com.tw/articles/10217858)

git [官網](https://git-scm.com/)
----
<img src="./article_img/git.png" width="200" height="80"/>

這是對於程式版本控制的工具，透過他你可以輕鬆回到過去，並且在多人協作時也能有效管控
[windows下載頁面](https://git-scm.com/download/win)
、[mac下載頁面](https://git-scm.com/download/mac)  
>我有朋友使用windows怎麼樣都無法正常安裝git，如果你也遇到了這個不幸，你還是有[Git桌面板](https://desktop.github.com/)可以選擇的
常用指令如下
```
git fetch 抓取遠端數據庫(僅確認有什麼更新，不合併)
git pull 抓取遠端數據庫更新
git push 更新遠端數據庫
```
如果你想要深入研究可以參考[連猴子都懂的Git入門指南](https://backlog.com/git-tutorial/tw/intro/intro1_1.html)

yarn [官網](https://classic.yarnpkg.com/zh-Hant/)  
----
<img src="./article_img/yarn.png" width="160" height="80"/>

這是專門安裝套件的軟體  
站在巨人的肩膀上你才能看得更遠，妥善運用別人提供的套件，程式的路能走得更遠  
[windows下載頁面](https://classic.yarnpkg.com/zh-Hant/docs/install#windows-stable)、[mac下載頁面](https://classic.yarnpkg.com/zh-Hant/docs/install#mac-stable)
這篇文章有更詳細的說明[用Yarn取代npm加速開發](https://ithelp.ithome.com.tw/articles/10191745)

VScode [官網](https://code.visualstudio.com/)
----
<img src="./article_img/vscode.png" width="80" height="80"/>

現在已經過了用記事本在打程式的年代了，透過IDE(整合開發環境)可以大幅增加你撰寫程式的速度
##### 優點
1. 適合新手：不需再在終端機下安裝及設定各種前置作業，能節省建立開發環境的成本，並加速對開發環境的了解。
2. 執行代碼：可以在IDE內直接執行一段程式碼，不需離開編輯器。
3. 代碼高亮：將原始碼以不同顏色顯現，讓我們閱讀更方便。
4. 代碼智能格式化：當輸入if或while時，編輯器知道下一行要縮進。
>以上文字擷取於[一應俱全的整合開發環境IDE](https://docs.f5ezcode.in/cs-basic/di-ba-zhang-gong-cheng-de-gong-ju/8.1-zheng-he-jing-ide)文章段落

[下載頁面](https://code.visualstudio.com/)  

今天對於專案的前置環境說明到這裡，如果環境設定上有什麼問題的話實屬正常，畢竟每個電腦的環境都有些許不同，可以先用google查詢看看喔～進入工程師的世界後[stackoverflow](http://stackoverflow.com/)會是你最好的朋友

### [Day3 對工具的基礎掌握](../day3/README.md)