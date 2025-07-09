'use client';

import { useEffect, useState } from 'react';

const sectorColors = [
    "#FFDDDD", "#FFEEDD", "#FFFFDD", "#DDFFDD",
    "#DDFFFF", "#DDDDFF", "#EEDDFF", "#FFDDFF",
    "#FFCCEE", "#FFDDEE", "#FFCCCC", "#FFEEEE"
];

const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: cx + r * Math.cos(angleInRadians),
        y: cy + r * Math.sin(angleInRadians)
    };
};

export default function ColoredAnalogClock() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time) return null;

    const cx = 50;
    const cy = 50;
    const r = 48;

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours() % 12 + minutes / 60;

    const hourAngle = hours * 30;
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;

    return (
        <svg viewBox="-5 -5 110 110" width="300" height="300">
        {/* 背景の12分割 */}
        {Array.from({ length: 12 }, (_, i) => {
            const start = i * 30;
            const end = start + 30;
            return (
            <path
                key={i}
                d={describeOuterArc(50, 50, 48, 40, start, end)}
                fill={sectorColors[i % sectorColors.length]}
                stroke="none"
            />
            );
        })}

        {/* 外枠 */}
        <circle cx={cx} cy={cy} r={r} stroke="black" strokeWidth="1.5" fill="none" />

        {/* 1分刻みの目盛り（60本） */}
        {Array.from({ length: 60 }, (_, i) => {
            const angle = i * 6 * (Math.PI / 180);
            const isHourTick = i % 5 === 0;
            const outer = r;
            const inner = isHourTick ? r - 4 : r - 2;
            const x1 = cx + outer * Math.cos(angle);
            const y1 = cy + outer * Math.sin(angle);
            const x2 = cx + inner * Math.cos(angle);
            const y2 = cy + inner * Math.sin(angle);
            return (
            <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="black"
                strokeWidth={isHourTick ? 1.5 : 0.5}
            />
            );
        })}

        {/* 数字 */}
        {Array.from({ length: 12 }, (_, i) => {
            const angle = ((i + 1) - 3) * 30 * (Math.PI / 180);
            const x = cx + 38 * Math.cos(angle);
            const y = cy + 38 * Math.sin(angle);
            return (
            <text
                key={i}
                x={x}
                y={y + 2}
                fontSize="6"
                textAnchor="middle"
                dominantBaseline="middle"
                fontWeight="bold"
            >
                {i + 1}
            </text>
            );
        })}

        {/* 5分刻みの数字（5, 10, ..., 60） */}
        {Array.from({ length: 12 }, (_, i) => {
        const minute = (i + 1) * 5;
        const angle = ((minute - 15) * 6) * (Math.PI / 180); // -15で12時を上に
        const radius = 53; // 時計の数字より外側
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);

        return (
            <text
            key={`min-${minute}`}
            x={x}
            y={y + 1}
            fontSize="4"
            fill="gray"
            textAnchor="middle"
            dominantBaseline="middle"
            >
            {minute}
            </text>
        );
        })}

        {/* 長針（分） */}
        <line
            x1={cx}
            y1={cy}
            x2={cx + 28 * Math.cos((minuteAngle - 90) * Math.PI / 180)}
            y2={cy + 28 * Math.sin((minuteAngle - 90) * Math.PI / 180)}
            stroke="black"
            strokeWidth="1.5"
        />

        {/* 短針（時） */}
        <line
            x1={cx}
            y1={cy}
            x2={cx + 20 * Math.cos((hourAngle - 90) * Math.PI / 180)}
            y2={cy + 20 * Math.sin((hourAngle - 90) * Math.PI / 180)}
            stroke="black"
            strokeWidth="3"
        />

        {/* 秒針 */}
        <line
            x1={cx}
            y1={cy}
            x2={cx + 32 * Math.cos((secondAngle - 90) * Math.PI / 180)}
            y2={cy + 32 * Math.sin((secondAngle - 90) * Math.PI / 180)}
            stroke="red"
            strokeWidth="1"
        />

        {/* 中心 */}
        <circle cx={cx} cy={cy} r={2} fill="black" />
        </svg>
    );
}

function describeOuterArc(cx: number, cy: number, rOuter: number, rInner: number, startAngle: number, endAngle: number) {
    const startOuter = polarToCartesian(cx, cy, rOuter, endAngle);
    const endOuter = polarToCartesian(cx, cy, rOuter, startAngle);
    const startInner = polarToCartesian(cx, cy, rInner, startAngle);
    const endInner = polarToCartesian(cx, cy, rInner, endAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", startOuter.x, startOuter.y,
        "A", rOuter, rOuter, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
        "L", startInner.x, startInner.y,
        "A", rInner, rInner, 0, largeArcFlag, 1, endInner.x, endInner.y,
        "Z"
    ].join(" ");
}