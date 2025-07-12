import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
// Firestore 初期化済みインスタンス

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
    quizType: "kanji" | "calc" | "clock";
    correctCount: number;
    }) {
    const docId = `${year}-${String(month + 1).padStart(2, "0")}`;
    const ref = doc(db, "users", userId, "calendar", docId);
    const snap = await getDoc(ref);
    const data = snap.exists() ? snap.data() : { stampedDays: {} };

    const current = data.stampedDays?.[day] ?? { challenges: [], correctCount: 0 };
    const updatedChallenges = Array.from(new Set([...current.challenges, quizType]));
    const updatedCorrectCount = current.correctCount + correctCount;

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