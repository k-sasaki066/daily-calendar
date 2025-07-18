'use client';

import Link from "next/link";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signIn } from '@/lib/firebaseAuth';
import { useRouter } from 'next/navigation';
import SubmitButton from '@/components/common/SubmitButton';
import PasswordInput from '@/components/common/PasswordInput';

type FormData = {
    email: string;
    password: string;
};

const schema = yup.object({
    email: yup.string().required('メールアドレスは必須です').email('メールアドレスの形式が正しくありません'),
    password: yup.string().required('パスワードは必須です'),
}).required();

export default function LoginPage() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    // register は、React Hook Form における 入力フィールド（input 要素など）とフォーム状態を結びつけるための関数

    const onSubmit = async (data: FormData) => {
        try {
            const userCredential = await signIn(data.email, data.password);
            const user = userCredential.user;

            // メール確認済みかチェック
            if (!user.emailVerified) {
                alert('メールアドレスが確認されていません。メールを確認してください。');
                // 必要に応じて確認ページに遷移
                router.push('/auth/verify-email');
            return;
            }

            alert('ログイン成功');
            router.push('/');
        } catch (error: any) {
            if (error.code === 'auth/user-not-found') {
                setError('email', { type: 'manual', message: '登録されていないメールアドレスです。' });
            } else if (error.code === 'auth/wrong-password') {
                setError('password', { type: 'manual', message: 'パスワードが正しくありません。' });
            } else if (error.code === 'auth/invalid-credential') {
                setError('password', { type: 'manual', message: 'メールアドレスまたはパスワードが間違っています' });
            } else {
                alert('ログインに失敗しました。再度お試しください。');
            }
        }
    };

    return (
    <div className="w-[600px] mx-auto mt-30 p-6 border rounded text-center">
        <h1 className="text-2xl mb-4">ログイン</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
            type="email"
            placeholder="メールアドレス"
            {...register('email')}
            className="w-full p-2 mb-2 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm mb-3 text-left">{errors.email.message}</p>}

            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <PasswordInput
                    {...field}
                    placeholder="パスワード"
                    />
                )}
            />
            {errors.password && <p className="text-red-500 text-sm mb-3 text-left">{errors.password.message}</p>}

            <SubmitButton
                isSubmitting={isSubmitting} type='submit'
                className="w-full bg-blue-500 text-white p-2 mt-6 rounded hover:bg-blue-600 disabled:opacity-50"
            >
            ログイン
            </SubmitButton>
        </form>
        <Link href="/auth/reset-password" className="inline-block text-blue-600 hover:underline text-sm mt-4">
            パスワードを忘れた方はこちら
        </Link>
    </div>
    );
}