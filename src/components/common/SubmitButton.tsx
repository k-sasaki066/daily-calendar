'use client';

import React from 'react';

type Props = {
    isSubmitting: boolean;
    children: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: 'button' | 'submit' | 'reset';
};

export default function SubmitButton({ isSubmitting, children, className, onClick, type = 'button' }: Props) {
    return (
        <button
        type={type}
        onClick={onClick}
        disabled={isSubmitting}
        className={`w-full text-white p-2 rounded flex justify-center items-center gap-2 transition ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        >
        {isSubmitting && (
            <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
            </svg>
        )}
        {isSubmitting ? '送信中...' : children}
        </button>
    );
}