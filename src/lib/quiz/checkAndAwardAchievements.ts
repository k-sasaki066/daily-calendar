import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { saveAchievement, isAchievementEarnedToday, check7DayChallenge, updateTotalPoints } from "@/lib/quiz/saveStamp";
import { titleToSlug } from "@/lib/utils/titleToSlug";

export type BadgeInfo = {
    title: string;
    image: string;
    message: string;
};

export async function checkAndAwardAchievements({
    userId,
    correctCount,
    quizTitle, // 例: "漢字マスター"
    isPerfect,
}: {
    userId: string;
    correctCount: number;
    quizTitle: string;
    isPerfect: boolean;
}): Promise<BadgeInfo[]> {
    const queue: BadgeInfo[] = [];

    // 連続チャレンジ称号
    const isStreak = await check7DayChallenge(userId);
    const alreadyStreak = await isAchievementEarnedToday(userId, "がんばり賞");
    if (isStreak && !alreadyStreak) {
        await saveAchievement(userId, "がんばり賞");
        queue.push({
            title: "がんばり賞",
            image: "/badges/streak.png",
            message: "7日間連続チャレンジ達成！",
        });
    }

    // 全問正解称号
    if (isPerfect) {
        const alreadyPerfect = await isAchievementEarnedToday(userId, quizTitle);
      
        if (!alreadyPerfect) {
            await saveAchievement(userId, quizTitle);
            queue.push({
                title: quizTitle,
                image: `/badges/${titleToSlug(quizTitle)}.png`,
                message: "全問正解おめでとうございます！",
            });
        }
    }

    // 合計ポイントからマイルストーン称号のチェック（更新は別処理で済）
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const currentTotal = userSnap.exists() ? userSnap.data().totalPoints ?? 0 : 0;

    const newTotal = await updateTotalPoints(userId, correctCount);

    const prevMilestone = Math.floor(currentTotal / 100);
    const newMilestone = Math.floor(newTotal / 100);

    for (let i = prevMilestone + 1; i <= newMilestone; i++) {
        const title = `${i * 100}ポイント達成`;
        const alreadyEarned = await isAchievementEarnedToday(userId, title);
        if (!alreadyEarned) {
            await saveAchievement(userId, title);
            queue.push({
                title,
                image: `/badges/point-${i * 100}.png`,
                message: `おめでとう!`,
            });
        }
    }

    return queue;
}
