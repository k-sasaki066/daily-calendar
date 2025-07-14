type BadgeInfo = {
    title: string;
};

type Props = {
    badges: BadgeInfo[];
};

const titleToSlug: Record<string, string> = {
    "漢字マスター": "kanji-master",
    "計算マスター": "math-master",
    "時計マスター": "clock-master",
    "がんばり賞": "streak",
};

export default function EarnedBadges({ badges }: Props) {
    if (badges.length === 0) return null;

    return (
        <div className="mt-12 text-center">
            <h3 className="text-3xl font-bold mb-4">🏅 今月の称号</h3>
            <div className="flex flex-wrap justify-center gap-10">
                {badges.map((badge, idx) => {
                    const slug = titleToSlug[badge.title] ?? "default";
                    return (
                        <div key={idx} className="flex flex-col items-center border p-4">
                            <img className="w-18 h-18 object-contain" src={`/badges/${slug}.png`} alt="" />
                            <p className="mt-2 text-lg font-semibold">{badge.title}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}