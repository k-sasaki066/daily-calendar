'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import {
    verifyPasswordResetCode,
    confirmPasswordReset,
} from 'firebase/auth';

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const oobCode = searchParams.get('oobCode');

    const [newPassword, setNewPassword] = useState('');
    const [status, setStatus] = useState<'verifying' | 'verified' | 'error' | 'success'>('verifying');

    useEffect(() => {
        if (!oobCode) {
        setStatus('error');
        return;
        }

        verifyPasswordResetCode(auth, oobCode)
        .then(() => setStatus('verified'))
        .catch(() => setStatus('error'));
    }, [oobCode]);

    const handleReset = async () => {
        if (!oobCode) return;
        try {
        await confirmPasswordReset(auth, oobCode, newPassword);
        setStatus('success');
        } catch {
        setStatus('error');
        }
    };

    if (status === 'verifying') {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <p className="text-gray-600 text-2xl">確認中...</p>
            </div>
        );
    }
    
    if (status === 'error') {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <p className="text-red-500 text-2xl font-bold">無効なリンクです</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="flex flex-col justify-center min-h-[calc(100vh-64px)] text-center">
                <p className="text-green-600 text-2xl">パスワードが変更されました！</p>
                <button
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => router.push('/auth/login')}
                >
                    ログインページへ戻る
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-40 text-center">
            <h1 className="text-2xl font-bold mb-4">新しいパスワードを入力</h1>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="新しいパスワード"
                className="border rounded p-2 w-full"
            />
            <button
                onClick={handleReset}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
            >
                パスワードを変更
            </button>
        </div>
    );
}