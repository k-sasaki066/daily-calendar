const titleToSlugMap: Record<string, string> = {
    "漢字マスター": "kanji-master",
    "計算マスター": "math-master",
    "時計マスター": "clock-master",
    "がんばり賞": "streak",
    "100ポイント達成": "point-100",
    "200ポイント達成": "point-200",
    "300ポイント達成": "point-300",
    "400ポイント達成": "point-400",
    "500ポイント達成": "point-500",
};

export function titleToSlug(title: string): string {
    return titleToSlugMap[title] ?? title.replace(/\s+/g, "-").toLowerCase();
}