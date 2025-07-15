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

## 実行環境
| 技術      | 説明                           |
|----------------|--------------------------------|
|OS|Alpine Linux（Docker ベースイメージ）|
|Node.js	20.x|（node:20-alpine)|
|Package Manager|Yarn|
|フレームワーク|Next.js 15.3.5|
|JavaScript|React 19|
|型システム|TypeScript 5.x|
|CSSフレームワーク|Tailwind CSS 4.1|
|バリデーション|React Hook Form + Yup|
|アニメーション|Lucide React|
|Firebase SDK|v11（Authentication, Firestore）|
|環境実行方式|Docker コンテナ|

## 使用技術
### Frontend
| 技術   |	説明                              |
|----------------|--------------------------------|
|Next.js|バージョン 15(App Router 使用)|
|React|バージョン 19|
|TypeScript|静的型付け|
|Tailwind CSS|CSS フレームワーク|
|Framer Motion|アニメーションライブラリ|
|React Hook Form|フォーム管理ライブラリ|
|Yup|バリデーションスキーマ定義|
|Lucide Icons|アイコンライブラリ|
|PostCSS|CSSトランスパイル|

### Backend
| 技術   |	説明                              |
|----------------|--------------------------------|
|Firebase Authentication|ユーザー認証|
|Cloud Firestore|NoSQL データベース|
|Firebase SDK v11|Firebase の JavaScript SDK|

## 環境構築
<br>
① gitクローン

```
git clone https://github.com/k-sasaki066/daily-calendar.git
```
<br>
② docker composeのバージョン確認（バージョンによって一部記載が異なるため）

```
docker compose version
```
<br>
▫️ -v1の場合
<br>
<br>
docker-compose.ymlファイルの先頭に追加

```
version: '3.8'
```
<br>
以下のdocker composeコマンドをdocker-composeに読み替えて実行してください
<br>
<br>
▫️ -v2の場合
<br>
変更点なし
<br>
<br>
③ dockerビルド

```
docker compose up -d --build
```
<br>
<br>
④envファイル作成

```
touch .env.local
```

<br>
<br>

### Firebase設定
<br>
▫️ Firebaseプロジェクト作成（公式ページ https://firebase.google.com/?hl=ja）
<br>
1. Firebaseアカウントを作成する（アカウント作成するには、Googleアカウントが必要です）
<br>
<img width="700" alt="トップ画面" src="https://github.com/user-attachments/assets/95c8afe0-b847-4edb-85c1-77eb983efd32" />
<br>
<br>
2. ログイン後、コンソール画面にて『Firebaseプロジェクトを使ってみる』をクリック
<br>
<img width="700" alt="1 プロジェクト作成" src="https://github.com/user-attachments/assets/86ab9923-29df-47d4-a348-a3155d626c78" />
<br>
<br>
3. プロジェクト名を入力する（任意の名前）
<br>
<img width="700" alt="2 プロジェクト名" src="https://github.com/user-attachments/assets/cd77cf4c-a006-49bf-aefc-c886349c1c08" />
<br>
<br>
4. Gemini（生成AI）の設定をして続行ボタンをクリック
<br>
<img width="700" alt="3 gemini設定" src="https://github.com/user-attachments/assets/58c763f6-0d6f-4a0b-80e8-b08d0e699d43" />
<br>
<br>
5. Google アナリティクスを有効にするか選択→ オフでも問題なし（後から有効化可能）
<br>
<img width="700" alt="4 アナリティクス" src="https://github.com/user-attachments/assets/ac00cfd3-7c40-4823-ac4a-34566f7c4804" />
<br>
<br>
6. プロジェクト作成ボタンをクリック
<br>
<img width="700" alt="5 作成" src="https://github.com/user-attachments/assets/8d396c8a-27cd-4b10-a118-c4aa27d51b35" />


### Firebase Authentication設定手順
<br>
1. コンソール画面左のメニューから『構築』→『Authentication』をクリック
<br>
<img width="700" alt="1 authentication設定" src="https://github.com/user-attachments/assets/ed2c678f-450e-418d-929d-f71d06768432" />
<br>
<br>
2. 『始める』ボタンをクリック→表示される項目から『メール / パスワード』をクリック
<br>
<img width="700" alt="2 Authenticationクリック後" src="https://github.com/user-attachments/assets/cefef638-e3ea-4a5d-862a-a3a1eee2b795" />
<br>
<br>
3. メール / パスワードを有効にする
<br>
<img width="700" alt="3 有効にする" src="https://github.com/user-attachments/assets/ef834190-a878-481d-ae75-3d5be12e0d63" />


### Firebaseメール認証設定
<br>
1. 『Authentication』→『テンプレート』→『メールアドレスの確認』
<br>
有効にするボタンがなければ、すでに有効になっています
<br>
送信されるメール内容が表示されます。下のテンプレート言語を英語→日本語に変更するとメール内容が日本語に変更されます
<br>
<img width="852" height="558" alt="メールアドレスの確認" src="https://github.com/user-attachments/assets/372a36ff-c5c6-4589-a975-0d714a174e28" />
<br>
<br>
3. 『編集ボタン』→『アクションURLをカスタマイズ』→アクションURLを「http://localhost:3000/auth/action」に設定する
<br>
※メール内のリンクをクリックすると認証完了ページ（Firebaseで用意されているデフォルトページ）に遷移します。このページにボタンを加えるなどカスタマイズしたい場合に設定
<br>
<img width="846" height="555" alt="アクションURLカスタマイズ" src="https://github.com/user-attachments/assets/e8b06f32-1221-4d42-936d-e060fc4e2d50" />
<br>
<br>
3.承認済みドメイン確認
<br>
『Authentication』→『設定』→『承認済みドメイン』(開発環境で使用するlocalhostがあるか)
<br>
<img width="867" height="556" alt="承認済みドメイン確認" src="https://github.com/user-attachments/assets/c4519ba1-7ca8-45cc-9307-ad9fbbd3556b" />
<br>
<br>

※送信メールはFirebase の内部メールサーバーから送信されるため、MailHog などではキャプチャできません。本物の Gmail や Yahoo メールなどを使って実際に送信確認できます
<br>
<br>


### Firebaseパスワード再設定
<br>
1. 『Authentication』→『テンプレート』→『パスワードの再設定』
<br>
有効にするボタンがなければ、すでに有効になっています
<br>
送信されるメール内容が表示されます。下のテンプレート言語を英語→日本語に変更するとメール内容が日本語に変更されます
<br>
<img width="855" height="558" alt="パスワード再設定画面" src="https://github.com/user-attachments/assets/c266d69d-7c45-429b-91f9-cee3b52b28e5" />
<br>
<br>
3. 『編集ボタン』→『アクションURLをカスタマイズ』→アクションURLを「http://localhost:3000/auth/action」に設定する
   <br>
(アクションURLはメール認証と同期しているので、すでに設定した場合は「http://localhost:3000/auth/action」になっていることを確認)
<br>
※メール内のリンクをクリックすると新パスワード入力ページ（Firebaseで用意されているデフォルトページ）に遷移します。このページにボタンを加えるなどカスタマイズしたい場合に設定
<br>
<img width="846" height="555" alt="アクションURLカスタマイズ" src="https://github.com/user-attachments/assets/e8b06f32-1221-4d42-936d-e060fc4e2d50" />
<br>
<br>
3.承認済みドメイン確認
<br>
『Authentication』→『設定』→『承認済みドメイン』(開発環境で使用するlocalhostがあるか)
<br>
<img width="867" height="556" alt="承認済みドメイン確認" src="https://github.com/user-attachments/assets/c4519ba1-7ca8-45cc-9307-ad9fbbd3556b" />
<br>
<br>

### Firebase アプリ登録設定手順
<br>
1. コンソール画面の左メニューから『Authentication』→『プロジェクトの設定』をクリック
<br>
<img width="700" alt="4 プロジェクト設定ボタン" src="https://github.com/user-attachments/assets/6352720f-3991-48e2-b28d-06d38c21b999" />
<br>
<br>
2. 画像赤枠のwebボタンをクリック
<br>
<img width="700" alt="5 webボタン" src="https://github.com/user-attachments/assets/772aa1a2-175d-44af-9179-c47d8a2d8bd4" />
<br>
<br>
3. アプリのニックネームを設定（任意の名前）して、『アプリを登録』をクリック（「Firebase Hosting を設定する」は今回は必要無いのでOFFでOK）
<br>
<img width="700" alt="6 ネーム設定" src="https://github.com/user-attachments/assets/37388415-343c-479f-a798-11d66eceb00c" />
<br>
<br>
4. 『<script>タグを使用する』を選択し、『コンソールへ進む』をクリック→Firebase 構成情報が表示されます
<br>
<img width="700" alt="7 SDK取得" src="https://github.com/user-attachments/assets/b556c310-5c2e-41c5-b928-b388aeef2987" />
<br>
<br>
5.  .env.localファイルに追記(「プロジェクトの設定」ページから取得できます)
<br>
  
```
NEXT_PUBLIC_FIREBASE_API_KEY=apikey
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=-authDomain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=projectId
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=storageBucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=messagingSenderId
NEXT_PUBLIC_FIREBASE_APP_ID=appId
```
<br>
<br>


### Firestore Database作成手順
<br>
1. Firebaseコンソール → 左メニュー『Firestore Database』
<br>
<img width="940" height="555" alt="firestore database" src="https://github.com/user-attachments/assets/eac230dc-2d5e-409b-bf29-6597da5f16dc" />
<br>
<br>
2. 『データベースを作成』
<br>
<img width="793" height="465" alt="作成開始" src="https://github.com/user-attachments/assets/b1830af2-aa3e-4267-8ee5-3e7e450c55f8" />
<br>
<br>
3. ロケーションに『asia-northeast1（東京）』を選択→『次へ』
<br>
<img width="743" height="434" alt="ロケーション選択" src="https://github.com/user-attachments/assets/8ce668b6-75a5-4230-9f08-534d17053ff7" />
<br>
<br>
4. 『テストモード』を選択→『作成』
<br>
<img width="951" height="555" alt="テストモード" src="https://github.com/user-attachments/assets/1367b61b-288c-4c75-bf06-656eb196ff57" />
<br>
<br>
5. 『Firestire Database』→『ルール』
<br>
データベースへのアクセス権を設定する→『公開』
<br>
<img width="907" height="509" alt="スクリーンショット 2025-07-15 15 08 24" src="https://github.com/user-attachments/assets/f2e6e18a-291f-425d-82e0-a0983485c0a5" />
<br>
<br>

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
		// anniversaryコレクションは認証ユーザーは読み取り可能、書き込みは制限
    match /anniversaries/{docId} {
      allow read: if request.auth != null;
      allow write: if false;  // 必要に応じて管理者権限付与などに変更
    }

    // writingコレクションは認証ユーザーは読み取り可能、書き込みは制限
    match /writing/{docId} {
      allow read: if request.auth != null;
      allow write: if false;
    }

    // readingコレクションも同様
    match /reading/{docId} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    
    // users コレクション直下のドキュメント
    match /users/{userId} {
      
      // 認証済みかつユーザー本人のみ許可
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // users/{userId}/calendar サブコレクションのドキュメントも同様に本人のみ
      match /calendar/{docId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      match /achievementByMonth/{yearMonth} {
        allow read, write: if request.auth != null && request.auth.uid == userId;

        match /titles/{title} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }
  }
}
```


### OpenWeatherMap設定手順
<br>
1. アカウントを作成する(公式ページ https://home.openweathermap.org/users/sign_up)
<br>
<img width="1444" height="866" alt="アカウント登録" src="https://github.com/user-attachments/assets/591de91b-28af-483a-a3f9-a49f3150efc9" />
<br>
<br>
2. 登録したメールアドレスに認証メールが送信されるので『Verify your email』ボタンをクリック
<br>
<img width="523" height="564" alt="メール認証" src="https://github.com/user-attachments/assets/5c731474-290b-4285-89dc-44d333f3060e" />
<br>
<br>
3. 上部メニューの「My API keys」をクリックするとAPI keyが表示されます
<br>
<img width="1084" height="558" alt="API key取得" src="https://github.com/user-attachments/assets/46c867a6-e110-4d09-87f8-4f5fe822898f" />
<br>
<br>
4. .env.localファイルに追記
<br>

```
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key
```

<br>
<br>

### データベース登録
<br>
1. こちらのスプレッドシートを開く
<br>
https://docs.google.com/spreadsheets/d/1SYj040s7bdlVsaMU8tqUeIQQUwRIHSiByHwh9Bwtuno/edit?gid=1954454577#gid=1954454577
<br>
<br>
2. 『ファイル』→『コピーを作成』→任意のファイル名でコピーを作成する
<br>
作成したコピーファイルの『拡張機能』→『Apps Script』を開く
<br>
<img width="983" height="270" alt="スクリーンショット 2025-07-15 15 20 31" src="https://github.com/user-attachments/assets/bf2b0457-28eb-4630-b93f-a2245d136e84" />
<br>
<br>
3. 表示されるコードの該当部分を自身のFirebaseのプロジェクトIDに変更する
<br>
<img width="1091" height="204" alt="スクリーンショット 2025-07-15 15 25 45" src="https://github.com/user-attachments/assets/b952b377-5226-4b51-97d9-c37fdf9f1d6e" />
<br>
<br>
4. プルダウンで表示される関数から、赤枠の3つを一つずつ実行
<br>
sendAnniversarySheetを選択→実行→Firestoreに『Anniversary』が作成される(今日の記念日)
<br>
sendReadingSheetを選択→実行→Firestoreに『Reading』が作成される(漢字クイズの読みモードの問題集)
<br>
sendWritingSheetを選択→実行→Firestoreに『Writing』が作成される(漢字クイズの書きモードの問題集)
<br>
<img width="1090" height="262" alt="スクリーンショット 2025-07-15 15 29 41" src="https://github.com/user-attachments/assets/8f61a16d-b7e4-4da1-8d61-da84bb877f82" />
<br>
<br>
## URL

- 開発環境
  - ログインページ <http://localhost:3000/login>


