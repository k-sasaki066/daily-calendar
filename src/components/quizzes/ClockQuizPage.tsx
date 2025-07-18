"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import Clock from "@/components/quizzes/Clock";
import { handleQuizSubmit } from "@/lib/quiz/handleQuizSubmit";
import { useAuth } from '@/context/AuthContext';
import { BadgePopup } from "@/components/common/BadgePopup";
import { checkAndAwardAchievements } from "@/lib/quiz/checkAndAwardAchievements";

type Time = { hour: number; minute: number };

const getRandomTime = (): Time => {
    const hour = Math.floor(Math.random() * 12);
    const minute = [0,5,10,15,20,25,30,35,40,45,50,55][Math.floor(Math.random() * 12)];
    return { hour, minute };
};

const formatTime = (t: Time): string =>
    `${t.hour === 0 ? 12 : t.hour}:${t.minute.toString().padStart(2, "0")}`;

const TOTAL_QUESTIONS = 10;

export default function QuizPage() {
    const router = useRouter();
    const { user } = useAuth();

    const [mounted, setMounted] = useState(false);
    const [question, setQuestion] = useState<Time>({ hour: 3, minute: 15 });
    const [choices, setChoices] = useState<Time[]>([]);
    const [selected, setSelected] = useState<Time | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [questionCount, setQuestionCount] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [badgeQueue, setBadgeQueue] = useState<BadgeInfo[]>([]);
    const [currentBadge, setCurrentBadge] = useState<BadgeInfo | null>(null);

    type BadgeInfo = {
        title: string;
        image: string;
        message: string;
    };

    useEffect(() => {
        if (quizFinished && user) {
            (async () => {
                try {
                    await handleQuizSubmit({
                        quizType: "clock",
                        correctCount,
                    });

                    const queue = await checkAndAwardAchievements({
                        userId: user.uid,
                        correctCount,
                        quizTitle: "時計マスター",
                        isPerfect: correctCount === TOTAL_QUESTIONS,
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
    }, [quizFinished, correctCount]);

    useEffect(() => {
        setMounted(true);
        generateQuestion();
        setQuestionCount(1);
    }, []);

    const generateQuestion = () => {
        const q = getRandomTime();
        const options = [q];
        while (options.length < 4) {
        const t = getRandomTime();
        if (!options.some(o => o.hour === t.hour && o.minute === t.minute)) {
            options.push(t);
        }
        }
        setQuestion(q);
        setChoices(shuffleArray(options));
        setSelected(null);
        setShowResult(false);
    };

    const shuffleArray = <T,>(arr: T[]): T[] =>
        [...arr].sort(() => Math.random() - 0.5);

    const handleSelect = (choice: Time) => {
        setSelected(choice);
        setShowResult(true);

        // 正解判定・カウント
        if (choice.hour === question.hour && choice.minute === question.minute) {
        setCorrectCount((prev) => prev + 1);
        }
    };

    const handleNext = () => {
        if (questionCount >= TOTAL_QUESTIONS) {
        // 終了
        setQuizFinished(true);
        } else {
        generateQuestion();
        setQuestionCount((prev) => prev + 1);
        }
    };

    if (!mounted) return null;

    if (quizFinished) {
        return (
            <div className="text-center p-6 text-4xl h-[calc(100vh-64px)]">
                <h1 className="mt-10">クイズ終了！</h1>
                <p className="mt-20 text-6xl">
                正解数: {correctCount} / {TOTAL_QUESTIONS}
                </p>
                <button
                className="mt-8 bg-blue-500 text-white rounded px-6 py-2 text-2xl hover:bg-blue-600 active:bg-blue-700 transform hover:scale-105 transition-transform duration-200"
                onClick={() => {
                    // リセットして再スタート
                    setCorrectCount(0);
                    setQuestionCount(1);
                    setQuizFinished(false);
                    generateQuestion();
                }}
                >
                もう一度挑戦する
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

    return (
        <div className="h-[calc(100vh-64px)]">
            <div className="h-[90%] text-center p-8 mt-4 flex flex-col items-center">
                <p className="text-2xl mb-3 mx-auto">
                    {questionCount} / {TOTAL_QUESTIONS} 問目
                </p>
                <h2 className="text-3xl mb-6 mx-auto">
                    この時計は何時？
                </h2>
                <Clock hour={question.hour} minute={question.minute} />
                <div className="mt-8 flex gap-4">
                    {choices.map((choice, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSelect(choice)}
                        disabled={showResult}
                        className={`border rounded px-4 py-2 text-2xl
                        ${showResult && choice.hour === question.hour && choice.minute === question.minute
                            ? 'bg-green-200'
                            : showResult && selected?.hour === choice.hour && selected?.minute === choice.minute
                            ? 'bg-red-200'
                            : 'hover:bg-blue-100'
                        }`}
                    >
                        {formatTime(choice)}
                    </button>
                    ))}
                </div>

                {showResult && (
                    <>
                    <p className="mt-8 text-3xl">
                        {selected?.hour === question.hour && selected?.minute === question.minute
                        ? "⭕️正解！"
                        : `❌不正解！正解は ${formatTime(question)} です`}
                    </p>
                    <button
                        onClick={handleNext}
                        className="mt-4 bg-blue-500 text-white rounded px-6 py-2 text-2xl hover:bg-blue-600 active:bg-blue-700 transform hover:scale-105 transition-transform duration-200"
                    >
                        {questionCount >= TOTAL_QUESTIONS ? "結果を見る" : "次の問題へ"}
                    </button>
                    </>
                )}
                <div className="fixed bottom-10 right-[50%] translate-x-[50%]">
                    <button
                        onClick={() => router.push('/quiz')}
                        className="text-blue-500 underline text-xl hover:text-blue-700"
                    >
                        クイズをやめる
                    </button>
                </div>
            </div>
        </div>
    );
}