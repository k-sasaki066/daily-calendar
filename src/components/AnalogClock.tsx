'use client';

import { useEffect, useState } from 'react';

export default function AnalogClock() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time) return null;

    const seconds: number = time.getSeconds();
    const minutes: number = time.getMinutes();
    const hours: number = time.getHours() % 12 + minutes / 60;

    const numbers: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
    const ticks: number[] = Array.from({ length: 60 }, (_, i) => i);

    return (
        <div className="relative w-60 h-60 rounded-full bg-white shadow-md border border-gray-500/50">
            {/* 目盛り（60本） */}
            {ticks.map((tick) => (
                <div
                    key={tick}
                    className={`absolute left-1/2 top-1/2 ${tick % 5 === 0 ? 'h-2 w-[2px] bg-black' : 'h-1 w-[1px] bg-gray-500'
                        } origin-top`}
                    style={{
                        transform: `rotate(${tick * 6}deg) translateY(-120px)`
                    }}
                />
            ))}

            {/* 数字（1〜12） */}
            {numbers.map((num) => {
                const angle = (num - 3) * 30; // 3時を0度にする
                const radius = 98;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);

                return (
                    <span
                        key={num}
                        className="absolute text-base font-bold text-black"
                        style={{
                            top: `calc(50% + ${y}px)`,
                            left: `calc(50% + ${x}px)`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        {num}
                    </span>
                )
            })}

            {/* 長針 */}
            <div
                className="absolute w-[1px] h-24 bg-black top-[23px] left-1/2 origin-bottom"
                style={{ transform: `rotate(${minutes * 6}deg)` }}
            />
            {/* 短針 */}
            <div
                className="absolute w-[2px] h-16 bg-black top-[56px] left-1/2 origin-bottom"
                style={{ transform: `rotate(${hours * 30}deg)` }}
            />
            {/* 秒針 */}
            <div
                className="absolute w-[1px] h-28 bg-red-500/50 top-[10px] left-1/2 origin-bottom"
                style={{ transform: `rotate(${seconds * 6}deg)` }}
            />
            {/* 中心丸 */}
            <div className="absolute w-2 h-2 bg-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
    );
}