import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// 種別
type QuizType = "kanji" | "calc" | "clock";

// 共通：年月フォーマット
const getYearMonth = (date: Date): string =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

// 共通：称号の Firestore 参照を取得
const getAchievementRef = (userId: string, yearMonth: string, title: string) =>
    doc(db, "users", userId, "achievementByMonth", yearMonth, "titles", title);

// 共通：スタンプの Firestore 参照を取得
const getCalendarRef = (userId: string, yearMonth: string) =>
    doc(db, "users", userId, "calendar", yearMonth);

// 称号の保存
export async function saveAchievement(userId: string, title: string) {
    const now = new Date();
    const yearMonth = getYearMonth(now);
    const ref = getAchievementRef(userId, yearMonth, title);

    await setDoc(ref, { earnedAt: now }, { merge: true });
}

// 称号が今日付与されたか確認
export async function isAchievementEarnedToday(
    userId: string,
    title: string
    ): Promise<boolean> {
    const now = new Date();
    const yearMonth = getYearMonth(now);
    const ref = getAchievementRef(userId, yearMonth, title);
    const snap = await getDoc(ref);

    if (!snap.exists()) return false;

    const earnedAtRaw = snap.data()?.earnedAt;
    const earnedAt =
        earnedAtRaw?.toDate?.() ?? new Date(earnedAtRaw); // Timestamp | Date 両対応

    return (
        earnedAt.getFullYear() === now.getFullYear() &&
        earnedAt.getMonth() === now.getMonth() &&
        earnedAt.getDate() === now.getDate()
    );
}

// スタンプ保存（挑戦 + 正解数）
export async function saveStamp({
    userId,
    year,
    month,
    day,
    quizType,
    correctCount,
    }: {
    userId: string;
    year: number;
    month: number;
    day: number;
    quizType: QuizType;
    correctCount: number;
    }) {
    const docId = `${year}-${String(month + 1).padStart(2, "0")}`;
    const ref = getCalendarRef(userId, docId);
    const snap = await getDoc(ref);

    const data = snap.exists() ? snap.data() : { stampedDays: {} };
    const currentDay = data.stampedDays?.[day] ?? {
        challenges: [],
        correctCount: 0,
    };

    const updatedChallenges = Array.from(
        new Set([...currentDay.challenges, quizType])
    );
    const updatedCorrectCount = currentDay.correctCount + correctCount;

    await setDoc(
        ref,
        {
        ...data,
        month: docId,
        stampedDays: {
            ...data.stampedDays,
            [day]: {
            challenges: updatedChallenges,
            correctCount: updatedCorrectCount,
            },
        },
        },
        { merge: true }
    );
}

// 7日間連続挑戦をチェック
export async function check7DayChallenge(userId: string): Promise<boolean> {
    const now = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = date.getDate();

        const docId = `${year}-${month}`;
        const ref = doc(db, "users", userId, "calendar", docId);
        const snap = await getDoc(ref);

        const data = snap.exists() ? snap.data() : null;
        const stampedDay = data?.stampedDays?.[day];

        if (!stampedDay || !stampedDay.challenges || stampedDay.challenges.length === 0) {
            return false; // この日には挑戦していない
        }
    }

    return true; // 全7日間に挑戦していた
}