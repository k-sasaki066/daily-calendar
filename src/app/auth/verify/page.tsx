'use client';

import { useEffect, useState, useRef } from 'react';
import { applyActionCode } from 'firebase/auth';
import { useSearchParams } from 'next/navigation';
import { auth } from '@/lib/firebase';

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const hasRun = useRef(false);
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

    useEffect(() => {
        const run = async () => {
        const oobCode = searchParams.get('oobCode');

        if (!oobCode || hasRun.current) {
            return;
        }
        hasRun.current = true; // 以後は再実行しない

        try {
            await applyActionCode(auth, oobCode);
            await auth.currentUser?.reload(); // メール認証フラグを更新
            setStatus('success');
        } catch (e) {
            console.error("確認コードエラー:", e);
            setStatus('error');
        }
        };

        run();
    }, [searchParams]);

    if (status === 'verifying') {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <p className="text-gray-600 text-2xl">確認中です...</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <p className="text-red-500 text-xl">確認に失敗しました。リンクが無効か期限切れの可能性があります。</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="flex flex-col justify-center min-h-[calc(100vh-64px)] text-center">
                <h1 className="text-2xl font-bold mb-4">メールアドレスの確認が完了しました！</h1>
                <button
                    onClick={() => {
                    window.location.href = '/'; // 完全なリロード付き遷移
                    }}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    トップページへ
                </button>
            </div>
        );
    }
}