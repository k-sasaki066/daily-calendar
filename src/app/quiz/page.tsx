import Link from "next/link";

export default function QuizSelectorPage() {
    return (
        <div className="text-center mt-20 p-6 text-3xl space-y-8">
            <h1 className="text-3xl">クイズを選んでください</h1>
            <div className="flex justify-center gap-6">
                <Link href="/quiz/kanji">
                    <button className="bg-gray-500 text-white px-6 py-3 rounded text-2xl">漢字クイズ</button>
                </Link>
                <Link href="/quiz/clock">
                    <button className="bg-gray-500 text-white px-6 py-3 rounded text-2xl">時計クイズ</button>
                </Link>
                <Link href="/quiz/math">
                    <button className="bg-gray-500 text-white px-6 py-3 rounded text-2xl">計算クイズ</button>
                </Link>
            </div>
        </div>
    );
}