'use client';

import { useAuth } from '@/context/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import { useState } from 'react';
import SubmitButton from '@/components/common/SubmitButton';

export default function VerifyEmailPage() {
    const { user } = useAuth();
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleResend = async () => {
        if (!user || isSubmitting) return;

        try {
            setIsSubmitting(true);
            await sendEmailVerification(user);
            setMessage('確認メールを再送信しました。');
        } catch (err) {
            console.error(err);
            setMessage('エラーが発生しました。もう一度お試しください。');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="text-center mt-40">
            <h1 className="text-3xl mb-4">メールアドレスの確認</h1>
            <p className="mb-4">確認メールが送信されました。メール内のリンクをクリックしてください。</p>
            <SubmitButton
                isSubmitting={isSubmitting} onClick={handleResend}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
            >
                再送信
            </SubmitButton>
            {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    );
}
