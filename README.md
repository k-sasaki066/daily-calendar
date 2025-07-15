# 日めくりカレンダーアプリ
ログイン後、今日の日付、今日は何の日、現在時刻と現在地の天気が確認できます。
<br>
「漢字クイズ」「時計クイズ」「計算クイズ」に挑戦でき、合計正解数に応じて称号がもらえます。
<br>
クイズに挑戦した日にはカレンダーにスタンプが付き、獲得した称号が確認できます。
<br>

### TOPページ
<img width="1422" height="788" alt="top" src="https://github.com/user-attachments/assets/c5fc93fe-5293-4da9-9b8a-819928982222" />
<br>

## 作成した目的
フロントエンド学習のアウトプットのため
<br>
時計の読み方と漢字が苦手な息子のために、楽しみながら勉強してほしく作成
<br>

## 機能一覧
|会員登録画面|ログイン画面|
| --- | --- |
|<img width="500" height="788" alt="signup" src="https://github.com/user-attachments/assets/3a5e97f3-a097-46fd-b709-74448dc434a0" />|<img width="500" height="790" alt="signin" src="https://github.com/user-attachments/assets/3a577684-e15e-4a7b-8a98-066ef4be5279" />|
|ユーザー名、メールアドレス、パスワード、を入力して登録できます。<br>パスワードの目のマークをクリックすると入力した文字を確認できます。|メールアドレス、パスワードを入力するとログインできます。<br>パスワードの目のマークをクリックすると入力した文字を確認できます。|

|メール認証画面|認証メール|
| --- | --- |
|<img width="500" height="788" alt="メール認証" src="https://github.com/user-attachments/assets/96154371-026a-4fe1-8fd6-c5a298519331" />|<img width="500" height="505" alt="認証メール2" src="https://github.com/user-attachments/assets/52e96d91-7474-402d-95c1-34dd36497920" />|
|会員登録後メール認証画面に遷移し、登録したメールアドレスに認証メールが送信されます。<br>再送信ボタンをクリックすると認証メールを再送信できます。|送信される認証メールの例です。メール内のリンクをクリックすることで認証されます。|

|認証成功画面|リンク無効画面|
| --- | --- |
|<img width="500" height="788" alt="認証成功" src="https://github.com/user-attachments/assets/af60ead8-1e0b-4bda-bcf4-a59fc1187e51" />|<img width="500" height="791" alt="認証リンク無効" src="https://github.com/user-attachments/assets/a81174c3-d199-4288-8692-7ae4f79a30ef" />|
|認証が成功するとこの画面に遷移します。トップページへボタンをクリックして進みます。|認証メールのリンクが期限切れなどで無効の場合はこの画面に遷移します。|

|パスワードリセット画面|パスワードリセットメール|
| --- | --- |
|<img width="600" height="616" alt="パスワードリセット" src="https://github.com/user-attachments/assets/43818cee-7670-4e77-a7d1-b323137704a0" />|<img width="600" height="355" alt="リセットメール" src="https://github.com/user-attachments/assets/67f7206d-7115-470e-b713-5e533b0bdbc3" />|
|ログイン画面のパスワードを忘れた方はこちらをクリックするとこの画面に遷移します。<br>登録メールアドレスをクリックするとパスワードリセットメールが送信されます。|送信されるパスワードリセットメールです。<br>メール内のリンクをクリックすると新しいパスワード入力画面に遷移します。|

|新しいパスワード入力画面|リンク無効画面|
| --- | --- |
|<img width="500" height="847" alt="新しいパスワード" src="https://github.com/user-attachments/assets/c66cf27b-5027-495b-8187-89febbe9f453" />|<img width="500" height="846" alt="リセットメール無効" src="https://github.com/user-attachments/assets/7a4d5096-bc18-4bca-b58e-82614dab5cca" />|
|メールリンクをクリック後の画面です。<br>新しいパスワードを入力して送信するとパスワードが更新されます。|メールリンクが期限切れなどで向こうの場合はこの画面に遷移します。|

|パスワード更新成功画面|エラー画面|
| --- | --- |
|<img width="500" height="846" alt="新しいパス登録" src="https://github.com/user-attachments/assets/ae2dc94d-2f47-4af1-88c9-aa83342be4f7" />|<img width="500" height="846" alt="エラー" src="https://github.com/user-attachments/assets/6dc4cecc-19ea-4585-87fa-a456781ec85b" />|
|新しいパスワードが更新されるとこの画面に遷移します。<br>ログイン画面に進み、新しいパスワードでログインできるようになります。|何らかのエラーが発生した場合に遷移する共通のエラー画面です。|

|トップ画面|
| --- |
|<img width="1422" height="788" alt="top" src="https://github.com/user-attachments/assets/da8aec6a-2f5d-403f-a24b-a84a2cf64983" />|
|今日の日付、今日は何の日、現在時刻と現在地の天気が確認できます。<br>現在時刻はアナログ時計の見方を覚えやすいように色付けして、外周には短針の単位をつけました。<br>現在地の天気が天気は、画面を開いた時に表示される位置情報を許可することで表示されます。<br>背景画像は月毎に変わります。ヘッダーのユーザー名をクリックするとメニューが表示されます。|

|クイズ選択画面|漢字モード選択画面|
| --- | --- |
|<img width="500" height="788" alt="クイズ選択" src="https://github.com/user-attachments/assets/431e2845-1796-4ab9-a22d-112646a00f0c" />|<img width="500" height="845" alt="漢字モード選択" src="https://github.com/user-attachments/assets/e8380ba3-9009-42d4-9b3b-c25d970bd8ce" />|
|ヘッダーメニューのクイズを選択するとクイズ選択画面に遷移します。<br>挑戦したいクイズを選びます。|漢字クイズを選択するとさらに読みモードか書きモードか選択できます。<br>戻るボタンをクリックするとクイズ選択画面に戻ります。|

|漢字読みモード画面|漢字読みモード画面2|
| --- | --- |
|<img width="500" height="846" alt="読み" src="https://github.com/user-attachments/assets/5fda76cd-4ccb-44af-a56d-968b5bb422fe" />|<img width="500" height="846" alt="読み２" src="https://github.com/user-attachments/assets/420c351d-f8d1-469c-8074-aa4761c8b4ed" />|
|読みモードクイズの画面です。1回につきランダムで10問出題され、4つの選択肢が表示されます。<br>正解だと思う選択肢をクリックします。|不正解の場合、正解の読みが表示されます。次の問題ボタンで進みます。<br>画面下のリンクでクイズ選択画面や漢字モード選択画面に戻れます。|

|漢字書きモード画面|漢字書きモード画面2|
| --- | --- |
|<img width="500" height="845" alt="書き" src="https://github.com/user-attachments/assets/dd94ba83-257d-4f42-bd1d-d99f072e3ce4" />|<img width="500" height="846" alt="書き２" src="https://github.com/user-attachments/assets/fa187950-e10a-43b3-90a3-d15545d38ee7" />|
|書きモードクイズの画面です。1回につきランダムで10問出題され、4つの選択肢が表示されます。<br>正解だと思う選択肢をクリックします。|不正解の場合、正解の漢字が表示されます。次の問題ボタンで進みます。<br>画面下のリンクでクイズ選択画面や漢字モード選択画面に戻れます。|

|時計クイズ画面|時計クイズ画面2|
| --- | --- |
|<img width="500" height="847" alt="時計" src="https://github.com/user-attachments/assets/d2ee3ce1-276d-4748-bafc-31f2ed13dde5" />|<img width="500" height="847" alt="時計２" src="https://github.com/user-attachments/assets/d1cc6317-7501-4e3a-8361-5693be9e2b82" />|
|時計クイズの画面です。1回につきランダムで10問出題され、4つの選択肢が表示されます。<br>正解だと思う選択肢をクリックします。|不正解の場合、正解の時刻が表示されます。次の問題ボタンで進みます。<br>画面下のリンクでクイズ選択画面に戻れます。|

|計算クイズ画面|計算クイズ画面2|
| --- | --- |
|<img width="1422" height="846" alt="計算１" src="https://github.com/user-attachments/assets/59596f29-6ad6-4333-b069-2fae1c26f759" />|<img width="1422" height="846" alt="計算２" src="https://github.com/user-attachments/assets/46473a7b-a1a0-4152-9b83-12e4efe038a6" />|
|時計クイズの画面です。1回につきランダムで10問出題され、4つの選択肢が表示されます。<br>正解だと思う選択肢をクリックします。|足し算や引き算、単位換算などさまざまな文章問題が出題されます。次の問題ボタンで進みます。<br>画面下のリンクでクイズ選択画面に戻れます。|

|計算クイズ画面3|クイズ終了画面|
| --- | --- |
|<img width="500" height="847" alt="スクリーンショット 2025-07-15 13 08 20" src="https://github.com/user-attachments/assets/1f05cff1-90d7-4077-b0ad-38bfda45123d" />|<img width="500" height="846" alt="スクリーンショット 2025-07-15 13 04 04" src="https://github.com/user-attachments/assets/481724e3-ce28-4e14-be96-ecd2a1bc8af7" />|
|足し算や引き算、単位換算などさまざまな文章問題が出題されます。次の問題ボタンで進みます。<br>足し算の文章問題例|10問のクイズが終了すると10問中何問正解できたか表示されます。<br>もう一度挑戦するボタンで同じクイズを再挑戦、戻るボタンでクイズ選択画面に戻れます。|

|全問正解の称号|マイルストーンの称号|
| --- | --- |
|<img width="500" height="843" alt="全問正解" src="https://github.com/user-attachments/assets/64540c8a-49c2-42ab-bb43-20c51f048889" />|<img width="500" height="844" alt="マイル" src="https://github.com/user-attachments/assets/189f0c9f-e0de-4bc8-a606-c4d69d2aeef4" />|
|それぞれのクイズでその日に初めて全問正解した場合、称号がもらえます。|合計正解数に応じて称号がもらえます。この画面では合計正解数が100を超えた場合|

|カレンダー画面|カレンダー画面2|
| --- | --- |
|<img width="500" height="503" alt="カレンダー例" src="https://github.com/user-attachments/assets/29f5784a-7416-4258-ba08-199ccd1e8672" />|<img width="500" height="567" alt="カレンダー例2" src="https://github.com/user-attachments/assets/f5135a24-6ef7-4d56-9495-c04c265b01e3" />|
|ヘッダーメニューのカレンダーをクリックするとカレンダー画面に遷移します。<br>今月のカレンダーが表示され、両脇のボタンで前月と翌月を切り替えられます。<br>その日に1回でもクイズに挑戦できたらスタンプが表示されます。このスタンプは月毎に変わります。<br>すべてのクイズに挑戦できた場合は特別スタンプになります。<br>合計正解数がアニメーション付きで表示されます。|カレンダーの下に称号が表示されます。その日に獲得した称号とその月に獲得した称号を分けて表示しています。<br>7日間連続で挑戦できた場合は頑張り賞がもらえます。|
