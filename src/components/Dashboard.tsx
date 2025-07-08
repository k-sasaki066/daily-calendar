// useEffect を使うなら 'use client' 化が必要
'use client'

import DateCard from '@/components/DateCard'
import AnalogClock from '@/components/AnalogClock'
import { useEffect } from 'react'

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
    }, [monthName])

    return (
        <div className="relative min-w-screen min-h-screen flex justify-center items-center">
            {/* 背景を透かすオーバーレイ */}
            <div className="absolute inset-0 bg-white/40 backdrop-brightness-90 z-0" />

            {/* コンテンツ本体 */}
            <div className="relative z-10 lg:w-[800px] flex flex-col gap-6 items-center">
                <DateCard />
                <AnalogClock />
            </div>
        </div>
    )
}