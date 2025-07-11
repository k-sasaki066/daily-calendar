'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FirebaseActionPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');      // 'verifyEmail' or 'resetPassword'
    const oobCode = searchParams.get('oobCode'); // Firebaseの一時コード

    useEffect(() => {
        if (!mode || !oobCode) {
        router.replace('/error');
        return;
        }

        switch (mode) {
        case 'verifyEmail':
            router.replace(`/auth/verify?oobCode=${encodeURIComponent(oobCode)}`);
            break;
        case 'resetPassword':
            router.replace(`/auth/set-new-password?oobCode=${encodeURIComponent(oobCode)}`);
            break;
        default:
            router.replace('/error');
            break;
        }
    }, [mode, oobCode]);

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <p className="text-gray-600 text-2xl">リダイレクト中...</p>
        </div>
    );
}