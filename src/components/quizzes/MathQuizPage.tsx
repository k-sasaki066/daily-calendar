'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleQuizSubmit } from '@/lib/quiz/handleQuizSubmit';
import { saveAchievement, isAchievementEarnedToday, check7DayChallenge } from "@/lib/quiz/saveStamp";
import { useAuth } from '@/context/AuthContext';
import { BadgePopup } from "@/components/common/BadgePopup";

type Question = {
    text: string;
    correct: string | number;
    choices: (string | number)[];
};

const TOTAL = 10;

const generateRandomQuestion = (): Question => {
    const type = Math.floor(Math.random() * 14);

    let text = '';
    let correct: string | number = 0;

    switch (type) {
        case 0: {
            const a = rand(10, 50);
            const b = rand(10, 50);
            text = `${a} + ${b} = ?`;
            correct = a + b;
            break;
        }
        case 1: {
            const a = rand(30, 100);
            const b = rand(10, a);
            text = `${a} - ${b} = ?`;
            correct = a - b;
            break;
        }
        case 2: {
            const read = rand(10, 80);
            const remain = rand(5, 20);
            text = `本を${read}ページ読みました。のこりは${remain}ページあります。本はぜんぶで何ページ？`;
            correct = read + remain;
            break;
        }
        case 3: {
            const total = rand(30, 100);
            const used = rand(10, total - 5);
            text = `折り紙を${total}枚もっています。${used}枚使いました。のこりは何枚ですか？`;
            correct = total - used;
            break;
        }
        case 4: {
            const n100 = rand(1, 5);
            const n10 = rand(1, 5);
            const n1 = rand(1, 9);
            text = `100を${n100}個、10を${n10}個、1を${n1}個合わせた数は？`;
            correct = n100 * 100 + n10 * 10 + n1;
            break;
        }
        case 5: {
            const base = rand(10, 90);
            const delta = rand(1, 10);
            text = `${base}より${delta}多い数は？`;
            correct = base + delta;
            break;
        }
        case 6: {
            const base = rand(20, 100);
            const delta = rand(1, 10);
            text = `${base}より${delta}小さい数は？`;
            correct = base - delta;
            break;
        }
        case 7: {
            const baseAge = rand(10, 20);
            const addAge = rand(5, 10);
            text = `サトシくんは${baseAge}才です。タケシさんはサトシくんより${addAge}才年上です。タケシさんは何才？`;
            correct = baseAge + addAge;
            break;
        }
        case 8: { // cm → mm
            const cm = rand(1, 20);
            text = `${cm}cm = ?mm`;
            correct = `${cm * 10}mm`;
            break;
        }
        case 9: { // mm → cm mm
            const cm = rand(1, 20);
            const mm = rand(0, 9);
            const total = cm * 10 + mm;
            text = `${total}mm = ?cm ?mm`;
            correct = `${cm}cm ${mm}mm`;
            break;
        }
        case 10: { // cm + mm → mm
            const cm = rand(1, 20);
            const mm = rand(0, 9);
            text = `${cm}cm ${mm}mm = ?mm`;
            correct = `${cm * 10 + mm}mm`;
            break;
        }
        case 11: { // mm → cm mm
            const total = rand(11, 199);
            const cm = Math.floor(total / 10);
            const mm = total % 10;
            text = `${total}mm = ?cm ?mm`;
            correct = `${cm}cm ${mm}mm`;
            break;
        }
        case 12: {
            const total = rand(10, 20);
            const position = rand(2, 10);
            text = `${total}人ならんでいます。かなさんは前から${position}ばん目にいます。かなさんの後ろになん人いますか？`;
            correct = total - position;
            break;
        }
        case 13: {
            const appleCount = rand(10, 20);
            const pearExtra = rand(2, 10);
            text = `りんごを${appleCount}こ買いました。なしは、りんごより${pearExtra}こ多く買いました。なしは何こ買いましたか？`;
            correct = appleCount + pearExtra;
            break;
        }
    }

    const choices = generateChoices(correct);

    return { text, correct, choices };
};

const generateChoices = (correct: string | number): (string | number)[] => {
    const choiceSet = new Set<string | number>();
    choiceSet.add(correct);

    while (choiceSet.size < 4) {
        let dummy: string | number;

        if (typeof correct === 'number') {
            dummy = correct + rand(-10, 10);
        } else if (correct.includes('mm') && correct.includes('cm')) {
            // e.g. 6cm 8mm → 5cm 9mm, 7cm 2mm etc.
            const [cm, mm] = correct.match(/\d+/g)!.map(Number);
            const newCm = cm + rand(-1, 1);
            const newMm = mm + rand(-2, 2);
            dummy = `${Math.max(0, newCm)}cm ${Math.max(0, newMm)}mm`;
        } else if (correct.endsWith('mm')) {
            const num = parseInt(correct);
            dummy = `${num + rand(-15, 15)}mm`;
        } else {
            dummy = correct; // fallback
        }

        choiceSet.add(dummy);
    }

    return shuffle([...choiceSet]);
};

const rand = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

export default function MathQuizPage() {
    const router = useRouter();
    const { user } = useAuth();

    const [questionCount, setQuestionCount] = useState(1);
    const [question, setQuestion] = useState<Question | null>(null);
    const [selected, setSelected] = useState<string | number | null>(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [finished, setFinished] = useState(false);
    const [badgeQueue, setBadgeQueue] = useState<BadgeInfo[]>([]);
    const [currentBadge, setCurrentBadge] = useState<BadgeInfo | null>(null);

    type BadgeInfo = {
        title: string;
        image: string;
        message: string;
    };

    const generate = () => {
        const q = generateRandomQuestion();
        setQuestion(q);
        setSelected(null);
        setShowResult(false);
    };

    useEffect(() => {
        if (finished) {
            (async () => {
                try {
                    await handleQuizSubmit({
                        quizType: "calc",
                        correctCount,
                    });

                    const queue: BadgeInfo[] = [];

                    if (user) {
                        const isStreak = await check7DayChallenge(user.uid);
                        const alreadyEarned = await isAchievementEarnedToday(user.uid, "がんばり賞");

                        if (isStreak && !alreadyEarned) {
                            await saveAchievement(user.uid, "がんばり賞");
                            queue.push({
                                title: "がんばり賞",
                                image: "/badges/streak.png",
                                message: "7日間連続チャレンジ達成！",
                            });
                        }
                    }

                    if (correctCount === TOTAL && user) {
                        const alreadyEarnedToday = await isAchievementEarnedToday(user.uid, "計算マスター");

                        if (!alreadyEarnedToday) {
                            await saveAchievement(user.uid, "計算マスター");
                            queue.push({
                                title: "計算マスター",
                                image: "/badges/math-master.png",
                                message: "全問正解おめでとうございます！",
                            });
                        }
                    }
                    
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
    }, [finished, correctCount]);

    useEffect(() => {
        generate();
    }, []);

    const handleSelect = (value: string | number) => {
        setSelected(value);
        setShowResult(true);
        if (value === question?.correct) {
        setCorrectCount((c) => c + 1);
        }
    };

    const handleNext = () => {
        if (questionCount >= TOTAL) {
        setFinished(true);
        } else {
        setQuestionCount((q) => q + 1);
        generate();
        }
    };

    if (!question) return <p className="text-center mt-40">読み込み中...</p>;

    if (finished) {
        return (
        <div className="text-center p-6 mt-15 text-4xl">
            <h2 className="mt-10">クイズ終了！</h2>
            <p className="mt-16 text-6xl">
            正解数: {correctCount} / {TOTAL}
            </p>
            <button
            onClick={() => {
                setQuestionCount(1);
                setCorrectCount(0);
                setFinished(false);
                generate();
            }}
            className="mt-8 bg-blue-500 text-white px-6 py-2 rounded text-2xl hover:bg-blue-600 active:bg-blue-700 transform hover:scale-105 transition-transform duration-200"
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
        <div className="text-center p-8 mt-15 flex flex-col items-center max-w-[800px] pb-20">
            <p className="text-2xl mb-4">
                {questionCount} / {TOTAL} 問目
            </p>
            <h2 className="text-4xl mb-8 font-bold">{question.text}</h2>
            <div className="grid grid-cols-2 gap-8 mb-6">
                {question.choices.map((c, i) => (
                <button
                    key={i}
                    onClick={() => handleSelect(c)}
                    disabled={showResult}
                    className={`border px-4 py-2 rounded text-2xl ${
                    showResult && c === question.correct
                        ? 'bg-green-200'
                        : showResult && selected === c
                        ? 'bg-red-200'
                        : 'hover:bg-blue-100'
                    }`}
                >
                    {c}
                </button>
                ))}
            </div>
            {showResult && (
            <div className="mt-6 text-center">
                <div className="mb-4 text-2xl">
                {selected === question.correct
                    ? '⭕️ 正解！'
                    : `❌ 不正解。正解は ${question.correct}`}
                </div>
                <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-6 py-2 rounded text-2xl hover:bg-blue-600 active:bg-blue-700 transform hover:scale-105 transition-transform duration-200"
                >
                {questionCount === TOTAL ? '結果を見る' : '次の問題へ'}
                </button>
            </div>
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
    );
}