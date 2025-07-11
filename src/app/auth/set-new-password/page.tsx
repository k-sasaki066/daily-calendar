'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import {
    verifyPasswordResetCode,
    confirmPasswordReset,
} from 'firebase/auth';
import SubmitButton from '@/components/common/SubmitButton';

const schema = yup.object({
    newPassword: yup.string().required('パスワードは必須です').min(8, '8文字以上で入力してください'),
});

type FormData = {
    newPassword: string;
};

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const oobCode = searchParams.get('oobCode');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'verifying' | 'verified' | 'invalidCode' | 'success'>('verifying');

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onChange',  // ここがリアルタイムバリデーションのポイント
    });

    useEffect(() => {
        if (!oobCode) {
            setStatus('invalidCode');
            return;
        }

        verifyPasswordResetCode(auth, oobCode)
            .then(() => setStatus('verified'))
        .   catch(() => setStatus('invalidCode'));
    }, [oobCode]);

    const onSubmit = async (data: FormData) => {
        if (!oobCode) return;
        setIsSubmitting(true);

        try {
            await confirmPasswordReset(auth, oobCode, data.newPassword);
            setStatus('success');
        } catch(err) {
            console.error(err);
            setStatus('invalidCode');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === 'verifying') {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <p className="text-gray-600 text-2xl">確認中...</p>
            </div>
        );
    }
    
    if (status === 'invalidCode') {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <p className="text-red-500 text-2xl font-bold">無効なリンクです</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="w-[500px] mx-auto mt-40 text-center min-h-[calc(100vh-64px)]">
                <p className="text-green-600 text-2xl font-bold">パスワードが変更されました！</p>
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
        <div className="w-lg mx-auto mt-40 text-center">
            <h1 className="text-2xl font-bold mb-2">新しいパスワードを入力</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="password"
                    placeholder="新しいパスワード"
                    {...register('newPassword')}
                    className="border rounded p-2 mb-2 w-full"
                />
                {errors.newPassword && (
                    <p className="text-red-500 mb-4 text-left">{errors.newPassword.message}</p>
                )}
                <SubmitButton isSubmitting={isSubmitting} type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    パスワードを変更
                </SubmitButton>
            </form>
        </div>
    );
}