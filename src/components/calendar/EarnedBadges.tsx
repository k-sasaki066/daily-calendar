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
        <div>
            {todayBadges.length > 0 && (
                <section className="mt-10 text-center">
                <h3 className="text-3xl font-bold mb-4"> 今日の称号</h3>
                <div className="flex flex-wrap justify-center gap-10">
                    {todayBadges.map((badge, idx) => (
                    <div key={idx} className="flex flex-col items-center border p-4 w-[180px]">
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

            {monthBadges.length > 0 && (
                <section className="mt-12 text-center">
                <h3 className="text-3xl font-bold mb-4"> 今月の称号</h3>
                <div className="flex flex-wrap justify-center gap-10">
                    {monthBadges.map((badge, idx) => (
                    <div key={idx} className="flex flex-col items-center border p-4 w-[180px]">
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