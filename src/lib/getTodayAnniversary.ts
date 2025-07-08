import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export type Anniversary = {
    id: string;
    title: string;
    description: string;
    date?: string;
};

function getTodayDocId() {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 1〜12 → "01"〜"12"
    const date = now.getDate().toString().padStart(2, "0");         // 1〜31 → "01"〜"31"
    return `${month}${date}`;
}

// 非同期関数 (async) で、Promise<Anniversary | null> を返す
export async function getTodayAnniversary(): Promise<Anniversary | null> {
    const docId = getTodayDocId();
    // Firestore の anniversaries コレクションの中の、今日に対応するドキュメントへの参照
    const ref = doc(db, "anniversaries", docId);

    try {
        // snap は DocumentSnapshot オブジェクトで、ドキュメントの有無・データを持つ
        const snap = await getDoc(ref);
        if (snap.exists()) {
        // snap.data() で Firestore ドキュメントの内容を取得・Omit<Anniversary, "id"> は Anniversary 型から id を除いた型
        const data = snap.data() as Omit<Anniversary, "id">;
        // snap.id でドキュメントの ID を取得し、先ほどの data と結合して Anniversary 型のデータを返す
        return { id: snap.id, ...data };
        } else {
        console.log("記念日データが見つかりませんでした");
        return null;
        }
    } catch (err) {
        console.error("Firestore取得エラー:", err);
        return null;
    }
}