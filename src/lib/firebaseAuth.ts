import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const signUp = async (email: string, password: string, username: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ユーザー名（displayName）を設定
    await updateProfile(user, { displayName: username });

    return user;
};

export const signIn = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
    return await signOut(auth);
};

// 認証済みのユーザーは user.getIdToken() メソッドを持っており、これを使って Firebase ID トークンを取得できます。Firebase Auth は内部的にIDトークン（JWT）を使って認証状態を管理している

// Firebase IDトークンは発行後約1時間で有効期限が切れますが、Firebase SDKは自動でリフレッシュ（更新）を行う仕組みがあります。

// Firebase SDKのgetIdToken()を呼び出すと、
// 有効期限内なら現在のトークンを返す。有効期限が切れていたら、自動的に新しいトークンを取得（リフレッシュ）して返す。

// つまり、通常は開発者が明示的にリフレッシュ処理を実装する必要はありません。