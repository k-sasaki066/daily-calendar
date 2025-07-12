'use client';

import React from "react";

type ClockProps = {
    hour: number;
    minute: number;
};

const Clock: React.FC<ClockProps> = ({ hour, minute }) => {
    const hourAngle = (hour % 12) * 30 + (minute / 60) * 30;
    const minuteAngle = minute * 6;

    const hourMarks = Array.from({ length: 12 }, (_, i) => i + 1);
    const tickMarks = Array.from({ length: 60 }, (_, i) => i);

    return (
        <svg width="280" height="280" viewBox="0 0 100 100">
        {/* 枠 */}
        <circle cx="50" cy="50" r="48" stroke="black" strokeWidth="2" fill="white" />

        {/* 長針 */}
        <line
            x1="50"
            y1="50"
            x2={50 + 30 * Math.sin((Math.PI / 180) * minuteAngle)}
            y2={50 - 30 * Math.cos((Math.PI / 180) * minuteAngle)}
            stroke="black"
            strokeWidth="1"
        />

        {/* 短針 */}
        <line
            x1="50"
            y1="50"
            x2={50 + 20 * Math.sin((Math.PI / 180) * hourAngle)}
            y2={50 - 20 * Math.cos((Math.PI / 180) * hourAngle)}
            stroke="black"
            strokeWidth="2"
        />

        {/* 目盛り（60本） */}
        {tickMarks.map(i => {
            const angle = (Math.PI / 30) * i;
            const outer = 48;
            const inner = i % 5 === 0 ? 44 : 46; // 長い目盛りは5の倍数
            const x1 = 50 + outer * Math.sin(angle);
            const y1 = 50 - outer * Math.cos(angle);
            const x2 = 50 + inner * Math.sin(angle);
            const y2 = 50 - inner * Math.cos(angle);
            return (
            <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="black"
                strokeWidth={i % 5 === 0 ? 1.5 : 0.5}
            />
            );
        })}

        {/* 数字（1〜12） */}
        {hourMarks.map(i => {
            const angle = ((i - 3) * 30 * Math.PI) / 180; // 12時を上に
            const x = 50 + 37 * Math.cos(angle);
            const y = 50 + 37 * Math.sin(angle);
            return (
            <text
                key={i}
                x={x}
                y={y + 3}
                fontSize="5"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {i}
            </text>
            );
        })}
        </svg>
    );
};

export default Clock;