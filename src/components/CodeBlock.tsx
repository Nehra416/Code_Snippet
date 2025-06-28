'use client';

import { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";

const CodeBlock = ({ code }: { code: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative rounded-lg overflow-x-auto border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900 p-4">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 flex items-center gap-1 text-sm px-2 py-1 bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-zinc-700 transition"
            >
                {
                    copied ? <CopyCheck size={14} /> : <Copy size={14} />
                }
                {copied ? "Copied!" : "Copy"}
            </button>

            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200">
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default CodeBlock;
