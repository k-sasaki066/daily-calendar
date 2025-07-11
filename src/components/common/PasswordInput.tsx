'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    name?: string;
    id?: string;
};

export default function PasswordInput({
    value,
    onChange,
        placeholder = 'パスワード',
    error,
    name,
    id,
}: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative mb-2">
            <input
                type={showPassword ? 'text' : 'password'}
                value={value ?? ''}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                id={id}
                className={`w-full p-2 border rounded pr-10 ${error ? 'border-red-500' : ''}`}
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                tabIndex={-1}
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}