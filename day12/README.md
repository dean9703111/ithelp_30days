#### [回目錄](../README.md)
### Day12 try-catch讓程式更穩定

在[Day6 爬蟲起手式selenium](../day6/README.md)這裡我們有使用到try-catch來解決如果抓不到chrome driver的例外事件  
實際上我們現在的程式是非常脆落的，只要發生例外事件很容易就會崩潰，下面讓我舉例讓程式崩潰(或是卡住)的方式：  
1. 把Facebook跟Instagram網址改成不存在的網址 &rarr; 會因為網頁不存在而卡在那個畫面
2. 把粉專的網址改成不存在的網址 &rarr; 程式會因為無法抓到要讀取的元件而崩潰
3. 把粉專的網址改成不存在的粉專(或是移除的粉專) &rarr; 程式會因為無法抓到要讀取的元件而崩潰
以上舉例幾個最直覺讓程式壞掉的案例，為了避免這些悲劇的發生，try-catch就是我們的好朋友，


如果你還有什麼問題或是覺得有可以改善的地方歡迎在下方留言討論  

完整的重構過的程式碼在[這裡](https://github.com/dean9703111/ithelp_30days/day10)喔
你可以整個專案clone下來  
```
git clone https://github.com/dean9703111/ithelp_30days.git
```
如果你已經clone過了，那你每天pull就能取得更新的資料嚕  
```
git pull origin master
cd day11
調整你.env檔填上 FB & IG 登入資訊
yarn
yarn start
```
### [Day12 Try & Catch讓程式更穩定](../day12/README.md)