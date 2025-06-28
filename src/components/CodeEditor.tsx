'use client';

import { Editor } from '@monaco-editor/react';
import React, { useState } from 'react';
import type { Snippet } from '@/generated/prisma';
import { Button } from './ui/button';
import { saveSnippet } from '@/actions';
import { useRouter } from 'next/navigation';

const CodeEditor = ({ snippet }: { snippet: Snippet }) => {
    const [code, setCode] = useState(snippet.code);
    const updateSnippetAction = saveSnippet.bind(null, snippet.id, code);
    const router = useRouter();

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <form
                action={updateSnippetAction}
                className="mb-4 space-y-2"
            >
                <div>
                    <h1 className="text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white leading-snug">
                        Edit Snippet
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        Update and save your reusable code snippet.
                    </p>
                </div>

                {/* Cancel and Save Btns */}
                <div className="flex justify-end gap-2 pt-2">
                    <Button
                        type="submit"
                        className="h-8 px-3 text-sm"
                    >
                        Save
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.back()}
                        className="h-8 px-3 text-sm"
                    >
                        Cancel
                    </Button>
                </div>
            </form>

            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm">
                <Editor
                    height="60vh"
                    defaultLanguage="javascript"
                    defaultValue={code}
                    theme="vs-dark"
                    onChange={(value) => setCode(value || '')}
                    options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        // scrollBeyondLastLine: false,
                    }}
                />
            </div>
        </div>
    );
};

export default CodeEditor;
