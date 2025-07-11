'use client';

import Link from "next/link";
import { withAuth } from '@/components/common/WithAuth';

const buttonClass = "bg-gray-500 text-white px-6 py-3 rounded text-2xl hover:bg-gray-600 active:bg-gray-700 transform hover:scale-105 transition-transform duration-200";

function QuizSelectorPage() {
    return (
        <div className="text-center mt-20 p-6 text-3xl space-y-8">
            <h1 className="text-3xl">クイズを選んでください</h1>
            <div className="flex justify-center gap-6">
                <Link href="/quiz/kanji">
                    <button className={buttonClass}>漢字クイズ</button>
                </Link>
                <Link href="/quiz/clock">
                    <button className={buttonClass}>時計クイズ</button>
                </Link>
                <Link href="/quiz/math">
                    <button className={buttonClass}>計算クイズ</button>
                </Link>
            </div>
        </div>
    );
}

export default withAuth(QuizSelectorPage);