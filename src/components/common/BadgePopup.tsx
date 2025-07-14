'use client';

import { motion } from 'framer-motion';

type BadgePopupProps = {
    badgeImage: string;
    title: string;
    message: string;
    onClose: () => void;
};

export const BadgePopup = ({ badgeImage, title, message, onClose }: BadgePopupProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="bg-white p-8 rounded shadow-lg text-center max-w-[80%] sm:max-w-sm"
            >
                <h2 className="mb-4 text-3xl">{message}</h2>
                <img src={badgeImage} alt={title} className="w-24 h-24 mx-auto mb-4" />
                <p className="text-2xl font-bold mb-6">{title}をゲット！</p>
                <button
                onClick={onClose}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                閉じる
                </button>
            </motion.div>
        </div>
    );
};