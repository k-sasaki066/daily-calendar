"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import React, { useState } from "react";
import StampCalendar from '@/components/calendar/StampCard';
import EarnedBadges from "@/components/calendar/EarnedBadges";

type BadgeInfo = {
    title: string;
};

export default function StampCard() {
    const router = useRouter();
    
    const [today, setToday] = useState<Date | null>(null);
    const [currentYear, setCurrentYear] = useState<number | null>(null);
    const [currentMonth, setCurrentMonth] = useState<number | null>(null); // 0〜11

    const [user, setUser] = useState<User | null>(null);
    const [stampedDaysData, setStampedDaysData] = useState<{ [day: number]: { challenges: string[]; correctCount: number } }>({});
    const [totalPoints, setTotalPoints] = useState(0);
    const [displayedPoints, setDisplayedPoints] = useState(0);
    const [todayBadges, setTodayBadges] = useState<BadgeInfo[]>([]);
    const [monthBadges, setMonthBadges] = useState<BadgeInfo[]>([]);

    useEffect(() => {
        const now = new Date();
        setToday(now);
        setCurrentYear(now.getFullYear());
        setCurrentMonth(now.getMonth());
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user || currentYear === null || currentMonth === null || today === null) return;

        const fetchBadges = async () => {
            try {
                const year = currentYear;
                const monthStr = String(currentMonth + 1).padStart(2, "0");
                const day = today.getDate();

                const basePath = `users/${user.uid}/achievementByMonth/${year}-${monthStr}/titles`;
                const titlesRef = collection(db, basePath);

                const snap = await getDocs(query(titlesRef, orderBy("earnedAt", "asc")));

                const todayList: BadgeInfo[] = [];
                const monthList: BadgeInfo[] = [];

                for (const docSnap of snap.docs) {
                    const title = docSnap.id;
                    const earnedAtRaw = docSnap.data()?.earnedAt;
                    const earnedAt = earnedAtRaw?.toDate?.() ?? new Date(earnedAtRaw);

                    const badge: BadgeInfo = { title };

                    if (
                        earnedAt.getFullYear() === today.getFullYear() &&
                        earnedAt.getMonth() === today.getMonth() &&
                        earnedAt.getDate() === day
                    ) {
                        todayList.push(badge);
                    } else {
                        monthList.push(badge);
                    }
                }

                setTodayBadges(todayList);
                setMonthBadges(monthList);
            } catch (error) {
                console.error("称号の取得に失敗しました:", error);
            }
        };

        const fetchStampData = async () => {
            const docId = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;
            const ref = doc(db, "users", user.uid, "calendar", docId);
            try {
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    const data = snap.data();
                    setStampedDaysData(data.stampedDays || {});
                } else {
                    setStampedDaysData({});
                }

                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);
                const total = userSnap.exists() && typeof userSnap.data()?.totalPoints === "number"
                    ? userSnap.data()!.totalPoints
                    : 0;
                setTotalPoints(total);
            } catch (error) {
                console.error("Firestore 読み込みエラー:", error);
                router.push("/error");
            }
        };

        fetchBadges();
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

    if (today === null || currentYear === null || currentMonth === null) {
        // 日付情報がまだセットされていなければ何も表示しない
        return null;
    }

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
        setCurrentYear((y) => (y !== null ? y - 1 : null));
        } else {
        setCurrentMonth((m) => (m !== null ? m - 1 : null));
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((y) => (y !== null ? y + 1 : null));
        } else {
        setCurrentMonth((m) => (m !== null ? m + 1 : null));
        }
    };

    return (
    <div className="p-4 mx-auto w-[90%] text-center mt-10">
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
        <EarnedBadges todayBadges={todayBadges} monthBadges={monthBadges} />
    </div>
    );
}