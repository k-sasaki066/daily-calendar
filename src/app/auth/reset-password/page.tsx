'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { resetPassword } from '@/lib/firebaseAuth';
import { useState } from 'react';
import SubmitButton from '@/components/common/SubmitButton';

const schema = yup.object({
    email: yup.string().required('メールアドレスは必須です').email('メール形式が正しくありません'),
});

type FormData = {
    email: string;
};

export default function ResetPasswordPage() {
    const [message, setMessage] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = async (data: FormData) => {
        try {
        await resetPassword(data.email);
        setMessage('パスワードリセットのメールを送信しました');
        } catch (error: any) {
        setMessage(error.message || 'エラーが発生しました');
        }
    };

    return (
    <div className="w-[600px] mx-auto mt-40 p-6 border rounded">
        <h1 className="text-2xl mb-4 text-center">パスワードをリセット</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
            type="email"
            placeholder="登録済みのメールアドレス"
            {...register('email')}
            className="w-full p-2 mb-2 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm mb-3">{errors.email.message}</p>}

            <SubmitButton
                type="submit"
                isSubmitting={isSubmitting}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 mt-6"
            >
            送信
            </SubmitButton>
        </form>

        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
    );
}