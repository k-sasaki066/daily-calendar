"use client";

import { titleToSlug } from "@/lib/utils/titleToSlug";


type BadgeInfo = {
    title: string;
};

type Props = {
    todayBadges: BadgeInfo[];
    monthBadges: BadgeInfo[];
};

export default function EarnedBadges({ todayBadges, monthBadges }: Props) {
    if (todayBadges.length === 0 && monthBadges.length === 0) return null;

    return (
        <div className="px-4">
            {todayBadges.length > 0 && (
                <section className="mt-10 text-center">
                <h3 className="text-3xl font-bold mb-6 text-blue-600"> 今日の称号</h3>
                <div className="flex flex-wrap justify-center gap-10">
                    {todayBadges.map((badge, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 shadow-md rounded-lg p-4 flex flex-col items-center hover:scale-105 transition-transform duration-200 w-[180px] relative">
                        <img
                        className="w-26 h-26 object-contain"
                        src={`/badges/${titleToSlug(badge.title)}.png`}
                        alt=""
                        />
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg select-none">
                            NEW
                        </span>
                        <p className="mt-2 text-lg font-semibold">{badge.title}</p>
                    </div>
                    ))}
                </div>
                </section>
            )}

            {monthBadges.length > 0 && (
                <section className="mt-12 text-center">
                <h3 className="text-3xl font-bold mb-6 text-green-600">今月の称号</h3>
                <div className="flex flex-wrap justify-center gap-10">
                    {monthBadges.map((badge, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 shadow-md rounded-lg p-4 flex flex-col items-center hover:scale-105 transition-transform duration-200 w-[180px]">
                        <img
                        className="w-26 h-26 object-contain"
                        src={`/badges/${titleToSlug(badge.title)}.png`}
                        alt=""
                        />
                        <p className="mt-2 text-lg font-semibold">{badge.title}</p>
                    </div>
                    ))}
                </div>
                </section>
            )}
        </div>
    );
}