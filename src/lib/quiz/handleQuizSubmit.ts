import { getAuth } from "firebase/auth";
import { saveStamp } from "@/lib/quiz/saveStamp";

export async function handleQuizSubmit({
    quizType,
    correctCount,
    }: {
    quizType: "kanji" | "clock" | "calc";
    correctCount: number;
    }) {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
        throw new Error("ログインしていません");
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-11
    const day = today.getDate();

    await saveStamp({
        userId,
        year,
        month,
        day,
        quizType,
        correctCount,
    });
}