'use client';

import { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';
import { signOutUser } from '@/lib/firebaseAuth';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // メニュー外クリックで閉じる処理
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        const ok = window.confirm('ログアウトしますか？');
        if (!ok) return;
        await signOutUser();
        router.push('/auth/login');
    };

    return (
        <header className="w-full p-4 bg-slate-500/90 text-white flex justify-between items-center">
            <Link href="/" className="hover:underline text-2xl font-bold">
                Dairy-Calendar
            </Link>

            {loading ? (
                <p className="text-sm">読み込み中...</p>
            ) : user ? (
                <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="hover:underline focus:outline-none"
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                >
                    {user.displayName ? `${user.displayName}さん` : user.email} ▼
                </button>

                <AnimatePresence>
                    {menuOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10"
                    >
                        <li>
                            <Link
                                href="/quiz"
                                className="block px-4 py-2 hover:bg-gray-200"
                                onClick={() => setMenuOpen(false)}
                            >
                                クイズ
                            </Link>
                        </li>
                        
                        <li>
                            <Link
                                href="/calendar"
                                className="block px-4 py-2 hover:bg-gray-200"
                                onClick={() => setMenuOpen(false)}
                            >
                                カレンダー
                            </Link>
                        </li>
                        
                        <li>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 hover:bg-gray-200"
                            >
                                ログアウト
                            </button>
                        </li>
                    </motion.ul>
                    )}
                </AnimatePresence>
                </div>
            ) : (
                <div className="flex gap-4">
                    <Link href="/auth/register" className="hover:underline">
                        登録
                    </Link>
                    
                    <Link href="/auth/login" className="hover:underline">
                        ログイン
                    </Link>
                </div>
            )}
        </header>
    );
}