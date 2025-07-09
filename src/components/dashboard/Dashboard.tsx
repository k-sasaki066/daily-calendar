// useEffect を使うなら 'use client' 化が必要
'use client';

import DateCard from '@/components/dashboard/DateCard';
import AnalogClock from '@/components/dashboard/AnalogClock';
import AnniversaryCard from '@/components/dashboard/AnniversaryCard';
import WeatherCard from '@/components/dashboard/WeatherCard';
import { useEffect } from 'react';

export default function Dashboard() {
    const now = new Date();
    const monthName = now.toLocaleString('en-US', { month: 'long' }).toLowerCase();

    useEffect(() => {
        document.body.style.backgroundImage = `url(/images/${monthName}.png)`
        document.body.style.backgroundSize = 'cover'             // 全体を覆う
        document.body.style.backgroundPosition = 'center'        // 中央配置
        document.body.style.backgroundRepeat = 'no-repeat'       // 繰り返しなし
        document.body.style.backgroundAttachment = 'fixed'       // スクロールしても背景固定
        document.body.style.height = '100vh'

        return () => {
            document.body.style.backgroundImage = ''
            document.body.style.backgroundSize = ''
            document.body.style.backgroundPosition = ''
            document.body.style.backgroundRepeat = ''
            document.body.style.backgroundAttachment = ''
            document.body.style.height = ''
        }
    }, [monthName]);

    return (
        <div className="relative min-w-screen min-h-[calc(100vh-64px)] flex justify-center items-center">
            {/* 背景を透かすオーバーレイ */}
            <div className="absolute inset-0 bg-white/40 backdrop-brightness-90 z-0" />

            {/* コンテンツ本体 */}
            <div className="relative z-10 lg:w-[800px] md:w-[90%] flex flex-col gap-8 items-center">
                <DateCard />
                <AnniversaryCard />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-items-center w-full">
                    <AnalogClock />
                    <WeatherCard />
                </div>
            </div>
        </div>
    );
}