'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signUp } from '@/lib/firebaseAuth';
import { useRouter } from 'next/navigation';
import SubmitButton from '@/components/common/SubmitButton';

type FormData = {
    username: string;
    email: string;
    password: string;
};

const schema = yup.object({
    username: yup.string().required('ユーザー名は必須です').max(20, 'ユーザー名は20文字以内で入力してください'),
    email: yup.string().required('メールアドレスは必須です').email('正しいメールアドレスを入力してください'),
    password: yup.string().required('パスワードは必須です').min(8, 'パスワードは8文字以上で入力してください'),
}).required();

export default function RegisterPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = async (data: FormData) => {
        try {
        await signUp(data.email, data.password, data.username);
            alert('登録に成功しました！');
            router.push('/');
        } catch (error: any) {
        alert(error.message);
        }
    };

    return (
    <div className="w-[600px] mx-auto mt-30 p-6 border rounded">
        <h1 className="text-2xl mb-4 text-center">新規登録</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input
            {...register('username')}
            type="text"
            placeholder="ユーザー名（20文字以内）"
            className="w-full p-2 mb-2 border rounded"
        />
        {errors.username && <p className="text-red-500 text-sm mb-3">{errors.username.message}</p>}

        <input
            {...register('email')}
            type="email"
            placeholder="メールアドレス"
            className="w-full p-2 mb-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm mb-3">{errors.email.message}</p>}

        <input
            {...register('password')}
            type="password"
            placeholder="パスワード（8文字以上）"
            className="w-full p-2 mb-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm mb-3">{errors.password.message}</p>}

        <SubmitButton isSubmitting={isSubmitting}
            className="w-full bg-blue-500 text-white p-2 mt-6 rounded hover:bg-blue-600"
        >
            登録
        </SubmitButton>
        </form>
    </div>
    );
}