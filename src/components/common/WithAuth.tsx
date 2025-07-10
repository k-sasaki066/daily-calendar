'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const withAuth = (Component: React.ComponentType) => {
    return function AuthenticatedComponent(props: any) {
        const { user, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !user) {
                router.push('/auth/login');
            }
        }, [user, loading]);

        if (loading || !user) {
            return <p className="text-center mt-20">読み込み中...</p>;
        }

        return <Component {...props} />;
    };
};