import React from "react";

type Props = {
    year: number;
    month: number; // 0〜11
    stampedDays: number[];
    onChallenge: (day: number) => void;
    stampedDaysData?: { [day: number]: { challenges: string[]; correctCount: number } };
};

const allChallenges = ["kanji", "calc", "clock"];

const monthStampMap: { [key: number]: { dir: string; file: string } } = {
    0: { dir: "january", file: "daruma" },
    1: { dir: "february", file: "oni" },
    2: { dir: "march", file: "sakuramochi" },
    3: { dir: "april", file: "sakura" },
    4: { dir: "may", file: "strawberry" },
    5: { dir: "june", file: "frog" },
    6: { dir: "july", file: "watermelon" },
    7: { dir: "august", file: "ice" },
    8: { dir: "september", file: "rabbit" },
    9: { dir: "october", file: "ghost" },
    10: { dir: "november", file: "chestnut" },
    11: { dir: "december", file: "snowman" },
};

export default function StampCalendar({
    year,
    month,
    stampedDays,
    onChallenge,
    stampedDaysData
}: Props) {
    const today = new Date();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthData = monthStampMap[month];
    const normalStampImagePath = `/stamps/${monthData.dir}/${monthData.file}.png`;

    const isToday = (day: number) =>
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === day;

    // 月の初日の曜日を取得（0=日曜日, 1=月曜日...）
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    // 月曜始まりにするため調整（0: 日 → 6 に変換）
    const offset = firstDayOfWeek;

    // 空白マス（前月からの埋め）と日付マスを合成
    const calendarCells = [
        ...Array(offset).fill(null),
        ...Array(daysInMonth).fill(0).map((_, i) => i + 1),
    ];

    const weekdays = ["日","月", "火", "水", "木", "金", "土"];

    return (
        <div className="space-y-2">
            {/* 曜日ヘッダー */}
            <div className="grid grid-cols-7 text-center font-bold">
                {weekdays.map((day) => (
                <div key={day}>{day}</div>
                ))}
            </div>

            {/* カレンダー本体 */}
            <div className="grid grid-cols-7 gap-1">
                {calendarCells.map((day, idx) => {
                if (day === null) {
                    return <div key={`empty-${idx}`} />;
                }

                const stamped = stampedDays.includes(day);
                const todayFlag = isToday(day);

                // 日付に対応したスタンプデータを取得
                const dayData = stampedDaysData?.[day];
                
                // 特別スタンプ判定
                const isFullClear =
                    dayData &&
                    allChallenges.every((type) =>
                        dayData.challenges.includes(type)
                    );

                const stampImagePath = isFullClear
                    ? "/stamps/special/medal.png"
                    : normalStampImagePath;

                return (
                    <div
                    key={day}
                    onClick={() => onChallenge(day)}
                    className={`
                        relative w-full h-20
                        border flex justify-center items-center
                        cursor-pointer select-none rounded text-4xl
                        ${stamped ? "bg-gray-500 text-gray-500" : "text-slate-200"}
                        ${todayFlag ? "border-red-400 font-semibold" : "border-gray-600"}
                    `}
                    >
                    {day}
                        
                    {/* スタンプがある日だけ画像表示 */}
                    {dayData && (
                        <img
                            src={stampImagePath}
                            alt="stamp"
                            className="absolute w-22 h-22 inset-0 m-auto pointer-events-none object-contain"
                        />
                    )}
                    </div>
                );
                })}
            </div>
        </div>
    );
}
