'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const withAuth = (Component: React.ComponentType) => {
    return function AuthenticatedComponent(props: any) {
        const { user, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading) {
                if (!user) {
                    router.push('/auth/login');
                } else if (!user.emailVerified) {
                    router.push('/auth/verify-email'); // メール未確認ユーザー向けのページへ
                }
            }
        }, [user, loading]);

        if (loading || !user || !user.emailVerified) {
            return (
                <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                    <p className="text-gray-600 text-2xl">読み込み中...</p>
                </div>
            );
        }

        return <Component {...props} />;
    };
};