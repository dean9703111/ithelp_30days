#### [回目錄](../README.md)
## 番外篇 - 將爬蟲專案部署到 Ubuntu Server

因為朋友向公司有凹到一台沒在用的 Ubuntu Server，於是請我幫他把爬蟲專案部署到這台 Sever 上面，在部署的過程中遇到了不少新的問題，希望這些經驗可以幫助到有相同需求的朋友們

部署流程
----
1. 安裝 NVM & 指定版本的 Node.js
2. 安裝 Yarn
3. 下載 chrome
4. 下載 chrome driever
5. 下載專案 & 安裝套件
6. 專案運行環境設定
7. 執行專案

------------------------

# 1. 安裝 NVM & 指定版本的 Node.js
### 安裝 NVM 
1. 更新相依套件
    ```vim
    apt-get update
    apt-get install build-essential libssl-dev
    ```
2. 在[官網](https://github.com/nvm-sh/nvm/releases)確認最新的 nvm 版本
3. 用 curl 抓取最新版本
    ```vim
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
    ```
    > 最新版號請自行調整
4. 輸入指令來重開連線（因為 nvm 指令需要重開連線後才能使用）
    ```vim
    source ~/.profile
    ```
5. 確認安裝成功
    ```vim
    nvm --version
    ```

----

### 安裝指定版本的 Node.js 
1. 在[官網](https://nodejs.org/en/)確認 Node.js LTS 的最新版本
2. 安裝目標版本後設定該版本為預設
    ```vim
    nvm install 12.19
    nvm use 12.19
    nvm alias default 12.19
    ```
3. 確認目前 Node.js 版本
    ```vim
    node -v
    ```

----

# 2. 安裝 Yarn
其實跟著[官方教學](https://classic.yarnpkg.com/zh-Hant/docs/install/#debian-stable)就能順利安裝惹
1. 新增套件庫
    ```
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    ```
2. 安裝 Yarn 
    ```
    sudo apt-get update && sudo apt-get install yarn
    ```
3. 確認 Yarn 是否安裝成功
    ```
    yarn --version
    ```

----

# 3. 下載 chrome
1. 下載最新穩定版本的 chrome
    ```vim
    sudo curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add
    sudo echo "deb [arch=amd64]  http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
    sudo apt-get -y update
    sudo apt-get -y install google-chrome-stable
    ```
2. 確認下載的版本
    ```vim
    google-chrome --version
    ```
3. 因為我們沒有真的要打開瀏覽器，所以要安裝 Xvfb 讓他處理圖形化功能
    ```vim
    sudo apt-get install xvfb
    ```

----

# 4. 下載 chrome driever
1. 下載解壓縮套件
    ```vim
    sudo apt-get install unzip
    ```
2. 請依照上面下載的 chrome 版本去[官網](http://chromedriver.storage.googleapis.com/index.html)選擇對應的版本
    ```vim
    wget -N http://chromedriver.storage.googleapis.com/86.0.4240.22/chromedriver_linux64.zip
    unzip chromedriver_linux64.zip
    chmod +x chromedriver

    sudo mv -f chromedriver /usr/local/share/chromedriver
    sudo ln -s /usr/local/share/chromedriver /usr/local/bin/chromedriver
    sudo ln -s /usr/local/share/chromedriver /usr/bin/chromedriver
    ```

----

# 5. 下載專案 & 安裝套件
1. 下載專案
    ```vim
    git clone https://github.com/your_git_path
    ```
2. 安裝專案套件
    ```vim
    cd your_project_path
    yarn
    ```
3. 安裝排程控管套件
    ```
    npm install forever -g
    ```
----

# 6. 專案運行環境設定
1. 調整 .env 裡面的參數
    ```
    #填寫自己登入IG的真實資訊(建議開小帳號來實驗，因為帳號使用太頻繁會被官方鎖住)
    IG_USERNAME='ig username'
    IG_PASSWORD='ig password'

    #填寫自己登入FB的真實資訊(建議開小帳號來實驗，因為帳號使用太頻繁會被官方鎖住)
    FB_USERNAME='fb username'
    FB_PASSWORD='fb password'

    #FB跑經典版還是新版(classic/new)
    FB_VERSION='new'

    #填寫你目標放入的spreadsheetId
    SPREADSHEET_ID='your spreadsheetId'

    #這是設定排程的時間參數(目前預設每日22:00準時執行)
    CRONJOB_TIME='0 0 22 * * *'

    #放LINE Notify申請的權杖
    LINE_TOKEN='XXXXXX'
    ```
2. 放入 google sheet 憑證
    請在 tools/google_sheets 底下放入對應的 credentials.json、token.json
3. 將 Server 時間設定為台灣時區，這樣 CRONJOB_TIME 設定就不需要換算時間惹
    ```vim
    sudo cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime
    ```
----

# 7. 執行專案
1. 先在專案底下執行 yarn start 確認能否正常運行
    > 如果遇到如下錯誤
    ```
    UnhandledPromiseRejectionWarning: WebDriverError: unknown error: Chrome failed to start: exited abnormally.
    ```
    在 tools/initDrive.js 中增加下面這行便可解決
    ```js
    options.addArguments('--no-sandbox') //linux需要
    ```
2. 如果 yarn start 可以正常運行就可以執行 yarn forever 讓他背景執行並控管