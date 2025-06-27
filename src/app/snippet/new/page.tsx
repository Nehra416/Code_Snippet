import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

const CreateSnippetPage = () => {
    async function createSnippet(formData: FormData) {
        "use server";
        const title = formData.get("title") as string;
        const code = formData.get("code") as string;

        await prisma.snippet.create({
            data: {
                title,
                code,
            },
        });

        redirect("/");
    }

    return (
        <main className="max-w-2xl mx-auto px-6 py-12">

            <header className="mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                    Create a New Snippet
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Store and organize your reusable code for future use.
                </p>
            </header>

            <form
                action={createSnippet}
                className="space-y-6 bg-white dark:bg-zinc-900 p-8 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm"
            >
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-base text-gray-700 dark:text-gray-300">
                        Title
                    </Label>
                    <Input
                        type="text"
                        name="title"
                        id="title"
                        className="font-mono"
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
                        rows={10}
                        className="font-mono text-sm"
                        required
                    />
                </div>

                <div className="pt-4">
                    <Button
                        type="submit"
                        className="w-full transition-all hover:scale-[1.02]"
                    >
                        Create Snippet
                    </Button>
                </div>
            </form>
        </main>
    );
};

export default CreateSnippetPage;
