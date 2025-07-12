"use client";

import { useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import React, { useState } from "react";
import StampCalendar from '@/components/calendar/StampCard';

type StampedDay = { challenges: string[]; correctCount: number };

export default function StampCard() {
    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0〜11

    const [user, setUser] = useState<User | null>(null);
    const [stampedDaysData, setStampedDaysData] = useState<{ [day: number]: { challenges: string[]; correctCount: number } }>({});
    const [totalPoints, setTotalPoints] = useState(0);
    const [displayedPoints, setDisplayedPoints] = useState(0);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;

        const fetchStampData = async () => {
            const docId = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;
            const ref = doc(db, "users", user.uid, "calendar", docId);
            const snap = await getDoc(ref);

            if (snap.exists()) {
                const data = snap.data();
                setStampedDaysData(data.stampedDays || {});
                // 合計ポイント（正解数の合計）を計算
                const stampedDaysObj = data.stampedDays as Record<string, StampedDay> | undefined;
                const total = Object.values(stampedDaysObj ?? {}).reduce((sum, day) => sum + (day.correctCount ?? 0), 0);
                setTotalPoints(total);
            } else {
                setStampedDaysData({});
                setTotalPoints(0);
            }
        };

        fetchStampData();
    }, [currentYear, currentMonth, user]);

    // カウントアップアニメーション
    useEffect(() => {
        let frameId: number;
        const steps = 30; // 何回に分けて変化させるか
        const increment = (totalPoints - displayedPoints) / steps;

        let current = displayedPoints;
        let count = 0;

        if (increment <= 0) {
            setDisplayedPoints(totalPoints);
            return;
        }

        const update = () => {
            count++;
            current += increment;
            if (count >= steps) {
                setDisplayedPoints(totalPoints);
                cancelAnimationFrame(frameId);
            } else {
                setDisplayedPoints(Math.floor(current));
                frameId = requestAnimationFrame(update);
            }
        };

        frameId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameId);
    }, [totalPoints]);


    const stampedDays = Object.keys(stampedDaysData).map((d) => Number(d));

    const challenge = (day: number) => {
        if (
        today.getFullYear() !== currentYear ||
        today.getMonth() !== currentMonth ||
        today.getDate() !== day
        ) {
        alert("今日の日付のみスタンプを押せます！");
        return;
        }
        
        if (!stampedDays.includes(day)) {
            alert("クイズをクリアしたらスタンプが押されます。");
        }
    };

    const prevMonth = () => {
        if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((y) => y - 1);
        } else {
        setCurrentMonth((m) => m - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((y) => y + 1);
        } else {
        setCurrentMonth((m) => m + 1);
        }
    };

    return (
    <div className="p-4 mx-auto w-[800px] text-center mt-10">
        <div className="flex justify-center gap-4 items-center mb-10">
            <button
            onClick={prevMonth}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
            ←
            </button>
            
            <h2 className="text-3xl font-semibold">
                {currentYear}年 {currentMonth + 1}月
            </h2>

            <button
            onClick={nextMonth}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
            →
            </button>
        </div>

        <StampCalendar
            year={currentYear}
            month={currentMonth}
            stampedDays={stampedDays}
            onChallenge={challenge}
            stampedDaysData={stampedDaysData}
        />

        <div className="flex items-center gap-4 justify-center mt-6">
            <img
                src="/stamps/point.png"
                alt="stamp"
                className="w-18 h-18 object-contain"
            />
            <div className="flex items-end gap-4">
                <p className="text-4xl font-bold">{displayedPoints}</p>
                <span className="text-2xl font-medium">ポイント</span>
            </div>
        </div>
    </div>
    );
}