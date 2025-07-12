import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { getTodayAnniversary } from "@/lib/getTodayAnniversary";

type Anniversary = {
    title: string;
    description: string;
    date?: string;
};

export default function TodayEvent() {
    const [event, setEvent] = useState<Anniversary | null>(null);
    const [error, setError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const data: Anniversary | null = await getTodayAnniversary();
                setEvent(data);
            } catch (error) {
                console.error("❌ 記念日取得に失敗:", error);
                setError(true);
                router.push("/error");
            }
        })();
    }, []);

    return (
        <div>
        {event ? (
            <div>
            <h2 className="text-4xl">今日は「{event.title}」</h2>
            </div>
        ) : (
            <p>本日の記念日は見つかりませんでした。</p>
        )}
        </div>
    );
}