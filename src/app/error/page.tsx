export default function ErrorPage() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-red-500 mb-4">エラーが発生しました</h1>
            <p className="text-lg">申し訳ありません。もう一度お試しください。</p>
        </div>
    );
}