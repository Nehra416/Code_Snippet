'use client';

import React, { useState, useEffect } from 'react';
import { ClipboardCheck, ClipboardCopy, Moon, Sun } from 'lucide-react';

const ShareButton: React.FC = () => {
    const [isCopied, setIsCopied] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    const toggleTheme = () => {
        setIsDarkMode((prev) => {
            const next = !prev;
            document.documentElement.classList.toggle('dark', next);
            return next;
        });
    };

    const copyLink = () => {
        const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
        navigator.clipboard.writeText(currentUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {/* Theme Toggle Btn */}
            <button
                onClick={toggleTheme}
                aria-label="Toggle Dark Mode"
                className="w-10 h-10 rounded-full bg-white dark:bg-black text-black dark:text-white shadow-lg flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-800 transition "
            >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Copy Link Btn */}
            {isCopied ? (
                <button
                    className="bg-green-500 dark:bg-emerald-600 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center select-none"
                    aria-label="Link copied"
                >
                    <ClipboardCheck className="h-5 w-5" />
                </button>
            ) : (
                <button
                    onClick={copyLink}
                    aria-label="Copy link to clipboard"
                    className="bg-white dark:bg-black text-black dark:text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-800 transition "
                >
                    <ClipboardCopy className="h-5 w-5" />
                </button>
            )}
        </div>
    );
};

export default ShareButton;
