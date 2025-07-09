"use client";

import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

type QuizItem = {
    漢字: string;
    読み1?: string;
    読み2?: string;
    読み3?: string;
    書き1?: string;
    書き2?: string;
    書き3?: string;
    正解: string;
};

export default function KanjiQuizPage() {
    const [mode, setMode] = useState<"reading" | "writing" | null>(null);
    const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [shuffledChoices, setShuffledChoices] = useState<string[]>([]);

    useEffect(() => {
        if (!mode) return;

        const fetchData = async () => {
        const snapshot = await getDocs(collection(db, mode));
        const data = snapshot.docs.map((doc) => doc.data() as QuizItem);
        // // シャッフルして10問だけ抽出
        const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 10);

        setQuizzes(shuffled);
        setCurrentIndex(0);
        setSelected(null);
        setShowResult(false);
        };

        fetchData();
    }, [mode]);

    const quiz = quizzes[currentIndex] ?? null;

    useEffect(() => {
        if (!quiz) return;

        const choices = mode === "reading"
        ? [quiz.読み1, quiz.読み2, quiz.読み3, quiz.正解]
        : [quiz.書き1, quiz.書き2, quiz.書き3, quiz.正解];

        const filtered = choices.filter(Boolean) as string[];
        const shuffled = [...filtered].sort(() => Math.random() - 0.5);
        setShuffledChoices(shuffled);
    }, [quiz, mode]);

    const handleAnswer = (choice: string) => {
        setSelected(choice);
        setShowResult(true);
        if (choice === quiz?.正解) {
            setScore((prev) => prev + 1);
        }
    };

    const next = () => {
        setSelected(null);
        setShowResult(false);
        setCurrentIndex((prev) => prev + 1);
    };

    if (!mode) {
        return (
        <div className="mt-20 p-6 text-center">
            <h1 className="text-3xl mb-4">クイズモードを選んでください</h1>
            <button
            onClick={() => setMode("reading")}
            className="bg-blue-500 text-white px-4 py-2 rounded m-4 text-3xl"
            >
            読みクイズ
            </button>
            <button
            onClick={() => setMode("writing")}
            className="bg-green-500 text-white px-4 py-2 rounded m-4 text-3xl"
            >
            書きクイズ
            </button>
        </div>
        );
    }

    if (currentIndex >= quizzes.length) {
        return (
        <div className="mt-20 p-6 text-center text-4xl">
            <p className="mt-10">クイズ終了！</p>
            <p className="mt-20 text-6xl">正解数: {score} / {quizzes.length}</p>
            <button
            onClick={() => {
                setMode(null);
                setScore(0);
            }} // モード選択へ戻る
            className="mt-8 bg-purple-500 text-white px-4 py-2 rounded text-3xl"
            >
            もう一度チャレンジ
            </button>
        </div>
        );
    }

    if (quizzes.length === 0 || !quiz) {
        return <p className="p-6 text-center">読み込み中...</p>;
    }

    return (
        <div className="mt-20 p-6 text-center">
            <div className="absolute bottom-12 right-[50%] translate-x-[50%]">
                <button
                    onClick={() => {
                    setMode(null);
                    setScore(0);
                    setCurrentIndex(0);
                    setSelected(null);
                    setShowResult(false);
                    }}
                    className="text-blue-500 underline"
                >
                    モード選択に戻る
                </button>
            </div>

            <h2 className="text-4xl mb-12">
                {mode === "reading" ? `問題:  ${quiz.漢字}` : `問題:  ${quiz.漢字}`}
            </h2>

            <div className="flex flex-col gap-6 items-center mb-6 text-2xl">
                {shuffledChoices.map((choice, i) => (
                <button
                    key={i}
                    onClick={() => handleAnswer(choice!)}
                    disabled={showResult}
                    className={`px-4 py-2 rounded border w-40 ${
                    showResult
                        ? choice === quiz.正解
                        ? "bg-green-400"
                        : selected === choice
                        ? "bg-red-400"
                        : "bg-gray-200"
                        : "bg-blue-200 hover:bg-blue-300"
                    }`}
                >
                    {choice}
                </button>
            ))}
        </div>

        {showResult && (
            <div className="mt-8 mb-6 text-3xl">
            {selected === quiz.正解 ? "⭕️ 正解！" : `❌ 不正解。正解は「${quiz.正解}」`}
            </div>
        )}

        {showResult && (
            <button onClick={next} className="bg-purple-500 text-white px-4 py-2 rounded text-3xl">
                {currentIndex < quizzes.length - 1 ? "次の問題へ" : "結果を見る"}
            </button>
        )}
        </div>
    );
}