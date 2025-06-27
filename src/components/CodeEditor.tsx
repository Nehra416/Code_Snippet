'use client';

import { Editor } from '@monaco-editor/react';
import React, { useState } from 'react';
import type { Snippet } from '@/generated/prisma';
import { Button } from './ui/button';
import { saveSnippet } from '@/actions';

const CodeEditor = ({ snippet }: { snippet: Snippet }) => {
    const [code, setCode] = useState(snippet.code);
    const updateSnippetAction = saveSnippet.bind(null, snippet.id, code);

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <form
                action={updateSnippetAction}
                className="flex items-center justify-between mb-6"
            >
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Edit Snippet
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Update and save your reusable code snippet.
                    </p>
                </div>
                <Button
                    type="submit"
                    className="transition-all hover:scale-103"
                >
                    Save Changes
                </Button>
            </form>

            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm">
                <Editor
                    height="60vh"
                    defaultLanguage="javascript"
                    defaultValue={code}
                    theme="vs-dark"
                    onChange={(value) => setCode(value || '')}
                //   options={{
                //     fontSize: 14,
                //     minimap: { enabled: false },
                //     scrollBeyondLastLine: false,
                //   }}
                />
            </div>
        </div>
    );
};

export default CodeEditor;
