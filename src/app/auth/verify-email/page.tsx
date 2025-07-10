'use client';

import { useAuth } from '@/context/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import { useState } from 'react';

export default function VerifyEmailPage() {
    const { user } = useAuth();
    const [message, setMessage] = useState('');

    const handleResend = async () => {
        if (user) {
        await sendEmailVerification(user);
        setMessage('確認メールを再送信しました。');
        }
    };

    return (
        <div className="text-center mt-40">
            <h1 className="text-3xl mb-4">メールアドレスの確認</h1>
            <p>確認メールが送信されました。メール内のリンクをクリックしてください。</p>
            <button
                onClick={handleResend}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
            >
                再送信
            </button>
            {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    );
}
