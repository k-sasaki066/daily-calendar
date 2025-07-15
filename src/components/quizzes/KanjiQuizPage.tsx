"use client";

import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from 'next/navigation';
import { handleQuizSubmit } from "@/lib/quiz/handleQuizSubmit";
import { useAuth } from '@/context/AuthContext';
import { BadgePopup } from "@/components/common/BadgePopup";
import { checkAndAwardAchievements } from "@/lib/quiz/checkAndAwardAchievements";

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
    const router = useRouter();
    const { user } = useAuth();

    const [mode, setMode] = useState<"reading" | "writing" | null>(null);
    const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [shuffledChoices, setShuffledChoices] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [badgeQueue, setBadgeQueue] = useState<BadgeInfo[]>([]);
    const [currentBadge, setCurrentBadge] = useState<BadgeInfo | null>(null);

    type BadgeInfo = {
        title: string;
        image: string;
        message: string;
    };

    useEffect(() => {
        if (quizzes.length > 0 && currentIndex >= quizzes.length && user) {
            (async () => {
                try {
                    await handleQuizSubmit({
                        quizType: "kanji",
                        correctCount: score,
                    });

                    const queue = await checkAndAwardAchievements({
                        userId: user.uid,
                        correctCount: score,
                        quizTitle: "漢字マスター",
                        isPerfect: score === quizzes.length,
                    });

                    if (queue.length > 0) {
                        setBadgeQueue(queue);
                        setCurrentBadge(queue[0]);
                    }

                    console.log("結果を保存しました");
                } catch (error) {
                    console.error("結果の保存に失敗しました", error);
                    router.push("/error");
                }
            })();
        }
    }, [currentIndex, quizzes.length, score, user]);

    useEffect(() => {
        if (!mode) return;

        const fetchData = async () => {
            try {
                const snapshot = await getDocs(collection(db, mode));
                const data = snapshot.docs.map((doc) => doc.data() as QuizItem);
                // // シャッフルして10問だけ抽出
                const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 10);

                setQuizzes(shuffled);
                setCurrentIndex(0);
                setSelected(null);
                setShowResult(false);
                setError(null);
            } catch (error) {
                console.error("Firestoreデータ取得エラー:", error);
                setError("データの取得に失敗しました。");
                router.push('/error');
            }
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

    const buttonClass = "text-white p-12 py-2 rounded m-4 text-3xl transform hover:scale-105 transition-transform duration-200";

    if (!mode) {
        return (
        <div className="mt-15 p-6 text-center">
            <h1 className="text-3xl mb-4">クイズモードを選んでください</h1>
            <button
                onClick={() => setMode("reading")}
                className={`bg-blue-500 hover:bg-blue-600 active:bg-blue-700 ${buttonClass}`}
            >
            読み
            </button>
            <button
                onClick={() => setMode("writing")}
                className={`bg-green-500 hover:bg-green-600 active:bg-green-700 ${buttonClass}`}
            >
            書き
            </button>
            <div className="fixed bottom-10 right-[50%] translate-x-[50%]">
                <button
                    onClick={() => router.push('/quiz')}
                    className="text-blue-500 underline text-xl hover:text-blue-700"
                >
                    戻る
                </button>
            </div>
        </div>
        );
    }

    if (currentIndex >= quizzes.length) {
        return (
        <div className="mt-15 p-6 text-center text-4xl pb-24">
            <p className="mt-10">クイズ終了！</p>
            <p className="mt-20 text-6xl">正解数: {score} / {quizzes.length}</p>
            <button
            onClick={() => {
                setMode(null);
                setScore(0);
            }} // モード選択へ戻る
            className="mt-8 bg-purple-400 text-white px-4 py-2 rounded text-3xl hover:bg-purple-600 active:bg-purple-700 transform hover:scale-105 transition-transform duration-200"
            >
            もう一度チャレンジ
            </button>
            
            <div className="fixed bottom-10 right-[50%] translate-x-[50%]">
                <button
                    onClick={() => router.push('/quiz')}
                    className="text-blue-500 underline text-xl hover:text-blue-700"
                >
                    戻る
                </button>
            </div>
            
            {currentBadge && (
                <BadgePopup
                    badgeImage={currentBadge.image}
                    title={currentBadge.title}
                    message={currentBadge.message}
                    onClose={() => {
                    const nextQueue = badgeQueue.slice(1);
                    setBadgeQueue(nextQueue);
                    setCurrentBadge(nextQueue[0] ?? null);
                    }}
                />
            )}
        </div>
        );
    }

    if (quizzes.length === 0 || !quiz) {
        return <p className="p-6 text-center">読み込み中...</p>;
    }

    return (
        <div className="mt-10 p-6 text-center">
            <div className="absolute bottom-12 right-[50%] translate-x-[50%] flex items-center gap-8">
                <button
                    onClick={() => {
                    setMode(null);
                    setScore(0);
                    setCurrentIndex(0);
                    setSelected(null);
                    setShowResult(false);
                    }}
                    className="text-blue-500 underline text-xl hover:text-blue-700"
                >
                    モードを選ぶ
                </button>

                <button
                    onClick={() => router.push('/quiz')}
                    className="text-blue-500 underline text-xl hover:text-blue-700"
                >
                    クイズをやめる
                </button>
            </div>

            <p className="text-2xl mb-4">
                {currentIndex + 1} / {quizzes.length} 問目
            </p>

            <h2 className="text-4xl mb-12">
                {mode === "reading" ? `${quiz.漢字}` : `${quiz.漢字}`}
            </h2>

            <div className="flex flex-col gap-6 items-center mb-6 text-2xl">
                {shuffledChoices.map((choice, i) => (
                <button
                    key={i}
                    onClick={() => handleAnswer(choice!)}
                    disabled={showResult}
                    className={`px-4 py-2 rounded border w-60 ${
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
            <div className="mt-8 mb-4 text-3xl">
            {selected === quiz.正解 ? "⭕️ 正解！" : `❌ 不正解。正解は「${quiz.正解}」`}
            </div>
        )}

        {showResult && (
            <button onClick={next} className="bg-purple-400 text-white px-4 py-2 rounded text-3xl hover:bg-purple-600 active:bg-purple-700 transform hover:scale-105 transition-transform duration-200">
                {currentIndex < quizzes.length - 1 ? "次の問題へ" : "結果を見る"}
            </button>
        )}
        </div>
    );
}