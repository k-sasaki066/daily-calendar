"use client"; // ← クライアントコンポーネント宣言

import { useEffect, useState } from "react";

const DateCard = () => {
    const [dateInfo, setDateInfo] = useState({
        month: "",
        day: 0,
        weekday: "",
    });


    useEffect(() => {
        const now = new Date();
        const month = now.toLocaleString("ja-JP", { month: "long" });
        const day = now.getDate();
        const weekday = now.toLocaleString("ja-JP", { weekday: "long" });

        setDateInfo({ month, day, weekday });
    }, []);

    return (
        <div className="flex justify-between gap-5">
            <p className="text-8xl font-bold">{dateInfo.month}</p>
            <p className="text-8xl font-bold">{dateInfo.day}日</p>
            <p className="text-8xl font-bold">{dateInfo.weekday}</p>
        </div>
    );
};

export default DateCard