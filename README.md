# AutoPuncher
打刻を自動でやるスクリプト
## セットアップ
### インストール
```sh
$ yarn install
```
### 環境設定ファイル
`.env` に必要な情報を記載する。
```:.env
LOGIN_URL=...
FRAME_URL=...
EMPLOYEE_CODE_SELECTOR=...
PASSWORD_SELECTOR=...
PUNCH_IN_BUTTON_SELECTOR=...
PUNCH_OUT_BUTTON_SELECTOR=...
EMPLOYEE_CODE=...
PASSWORD=...
```
## 使い方
以下のコマンドで起動する。
```sh
$ ts-node ./src/index.ts [in|out]
```
`in` で出勤、 `out` で退勤
## 自動起動 for MacOS
Launchdを利用する。
### 設定方法
#### 設定ファイル
`autopuncher.in.plist` に下記のような内容を記載する。内容は必要に応じて変更可能。
```xml:autopuncher.in.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
 <key>Label</key>
   <string>autopuncher</string>
 <key>ProgramArguments</key>
   <array>
     <string>ts-node</string>
     <string>/path/to/src/index.ts</string>
     <string>in</string>
   </array>
 <key>StartInterval</key>
   <integer>60</integer>
 <key>RunAtLoad</key>
   <true/>
 <key>ExitTimeout</key>
   <integer>300</integer>
</dict>
</plist>
```
#### 登録
launchdに登録するために、以下のコマンドを実行する。
```sh
$ launchctl load ~/Library/LaunchAgents/autopuncher.in.plist
```
## TODO
- エラー処理
- シャットダウン時の自動実行