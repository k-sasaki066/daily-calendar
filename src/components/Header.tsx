'use client';

import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full p-4 bg-slate-500/90  text-white flex justify-between items-center">
            <Link href="/" className="hover:underline text-2xl font-bold">
                Dairy-Calendar
            </Link>
            <Link href="/quiz" className=" hover:underline">
                漢字クイズ
            </Link>
        </header>
    );
}