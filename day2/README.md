### Day2 工欲善其事，必先利其器

開始前我想先分享一個心態，無論是面對工作還是外包都一樣  
請你無論在面試工作或是談外包時衡量一下自己的實力  
如果你即將要面對的工作(外包)內容已經遠遠超過了你的舒適圈  
強烈建議不要接受，不要把工作與外包當成是一個給你練習基礎的地方  
你的同事跟業主會恨你的
尤其是外包，如果你的基礎不穩，運氣好你可能會做出一個貌似可以用的專案  
但實際上這個專案充滿著你所不知道的漏洞  
這塊我想只有實際在業界磨練過一段時間才能比較感同身受

另外我不知道為什麼有些人很喜歡去寫一些市面上已經提供的套件而不是直接使用它  
我個人的開發經驗中有97%以上的套件我是看過說明文檔就去使用，只有3%是真的去看這份套件到底怎麼寫  
會去看他怎麼寫通常不是因為他寫的太好，而是他寫的很爛有bug我需要去修正他或者評估使用其他解法

請不要重複造輪子，這是我這篇文章要表達的核心意義
就像是你需要了解怎麼使用電腦，但你不需要去學習怎麼做出一台電腦

了解套件程式的細節可以讓你在遇到技術瓶頸時昇華，但實際上很多人其實連理解文檔都有問題(雖然我承認很多作者文檔感覺根本亂寫...)  

講了這麼多垃圾話終於要開始今天的重點了

對於你接到一份外包，你所需要先決定的幾個東西
1. 用什麼程式語言完成它
2. 我對這個程式語言的掌握程度
3. 預估的完成時間
4. 前置環境準備

說到爬蟲，我想絕大多數的人第一個想到的一定是python  
python是一個很好的語言，但很可惜我對他的鑽研不夠深入  
如果這份外包我使用一個自己不夠熟悉的語言來撰寫那是一個不負責任的行為  
所以在這裡我選擇的語言是javacscript  

我認為前置環境的設定非常重要的
對於文章來說也很重要
如果每個人的環境設置都不一樣
那麼我文章的程式可能在許多電腦上都是無法執行的
所以環境的前置作業這塊我會分成windows/mac來個別解說
讓你們了解到為什麼叫使用這些工具

1. nodejs
2. NVM
3. git
4. yarn
5. VSCode

<hr>

nodejs [官網](https://nodejs.org/en/about/)
----
![image](./article_img/nodejs.png)
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
![image](./article_img/git.png)
這是對於程式版本控制的工具，透過他你可以輕鬆回到過去，並且在多人協作時也能有效管控
[windows下載頁面](https://git-scm.com/download/win)、[mac下載頁面](https://git-scm.com/download/mac)  
常用指令如下
```
git fetch 抓取遠端數據庫(僅確認有什麼更新，不合併)
git pull 抓取遠端數據庫更新
git push 更新遠端數據庫
```
如果你想要深入研究可以參考[連猴子都懂的Git入門指南](https://backlog.com/git-tutorial/tw/intro/intro1_1.html)

yarn [官網](https://classic.yarnpkg.com/zh-Hant/)  
----
![image](./article_img/yarn.png)
這是專門安裝套件的軟體  
站在巨人的肩膀上你才能看得更遠，妥善運用別人提供的套件，程式的路能走得更遠  
[windows下載頁面](https://classic.yarnpkg.com/zh-Hant/docs/install#windows-stable)、[mac下載頁面](https://classic.yarnpkg.com/zh-Hant/docs/install#mac-stable)
這篇文章有更詳細的說明[用Yarn取代npm加速開發](https://ithelp.ithome.com.tw/articles/10191745)

VScode [官網](https://code.visualstudio.com/)
----
![image](./article_img/vscode.png)
現在已經過了用記事本在打程式的年代了，透過IDE(整合開發環境)可以大幅增加你撰寫程式的速度
##### 優點
1. 適合新手：不需再在終端機下安裝及設定各種前置作業，能節省建立開發環境的成本，並加速對開發環境的了解。
2. 執行代碼：可以在IDE內直接執行一段程式碼，不需離開編輯器。
3. 代碼高亮：將原始碼以不同顏色顯現，讓我們閱讀更方便。
4. 代碼智能格式化：當輸入if或while時，編輯器知道下一行要縮進。
>以上文字擷取於[一應俱全的整合開發環境IDE](https://docs.f5ezcode.in/cs-basic/di-ba-zhang-gong-cheng-de-gong-ju/8.1-zheng-he-jing-ide)文章段落

[下載頁面](https://code.visualstudio.com/)  

今天對於專案的前置環境說明到這裡，如果環境設定上有什麼問題的話實屬正常，畢竟每個電腦的環境都有些許不同，可以先用google查詢看看喔～進入工程師的世界後[stackoverflow](http://stackoverflow.com/)會是你最好的朋友