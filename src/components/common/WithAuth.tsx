'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const withAuth = (Component: React.ComponentType) => {
    return function AuthenticatedComponent(props: any) {
        const { user, loading } = useAuth();
        const router = useRouter();
        const [hasError, setHasError] = useState(false);

        useEffect(() => {
            try {
                if (!loading) {
                    if (!user) {
                        router.push('/auth/login');
                    } else if (!user.emailVerified) {
                        router.push('/auth/verify-email');
                    }
                }
            } catch (err) {
                console.error('認証チェック中にエラー:', err);
                setHasError(true);
                router.push('/error');
            }
        }, [user, loading, router]);

        if (loading || !user || !user.emailVerified) {
            return (
                <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                    <p className="text-gray-600 text-2xl">{hasError ? 'エラーが発生しました' : '読み込み中...'}</p>
                </div>
            );
        }

        return <Component {...props} />;
    };
};