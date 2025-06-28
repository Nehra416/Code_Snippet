'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState } from "react";
import * as actions from "@/actions/index";
import { useRouter } from "next/navigation";

const CreateSnippetPage = () => {
    const [data, action] = useActionState(actions.createSnippet, { message: "" });
    const router = useRouter();

    return (
        <main className="max-w-2xl w-full mx-auto px-4 sm:px-6 pb-10 pt-4">

            <header className="mb-10">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight break-words">
                    Create a New Snippet
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    Store and organize your reusable code for future use.
                </p>
            </header>

            <form
                action={action}
                className="space-y-6 bg-white dark:bg-zinc-900 p-5 sm:p-8 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm"
            >
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-base text-gray-700 dark:text-gray-300">
                        Title
                    </Label>
                    <Input
                        type="text"
                        name="title"
                        id="title"
                        className="font-mono text-sm sm:text-base"
                        placeholder="e.g., Center a div with Flexbox"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="code" className="text-base text-gray-700 dark:text-gray-300">
                        Code
                    </Label>
                    <Textarea
                        name="code"
                        id="code"
                        placeholder="Paste your code here..."
                        rows={8}
                        className="font-mono text-sm sm:text-base"
                        required
                    />
                </div>

                {data.message &&
                    <div className="px-4 py-3 rounded-md border text-sm shadow-sm bg-red-100 border-red-400 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-100">
                        {data.message}
                    </div>
                }
                <div className="pt-4 flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4">
                    <Button
                        type="submit"
                        className="w-full sm:w-auto transition-all hover:scale-[1.02] text-sm sm:text-base"
                    >
                        Create Snippet
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.back()}
                        className="w-full sm:w-auto text-sm sm:text-base"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </main>
    );
};

export default CreateSnippetPage;
