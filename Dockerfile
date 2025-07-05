FROM node:18-alpine

# 作業ディレクトリを作成
WORKDIR /app

# 依存関係ファイルをコピー
COPY package.json package-lock.json* ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# Next.js は 3000 ポートを使うので expose
EXPOSE 3000

# 開発サーバー起動コマンド
CMD ["npm", "run", "dev"]