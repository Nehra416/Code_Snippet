import { deleteSnippet } from "@/actions";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const SnippetDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = parseInt((await params).id);

    const snippet = await prisma.snippet.findUnique({
        where: { id },
    });

    if (!snippet) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-12 text-center">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Snippet not found
                </h1>
                <p className="text-gray-500 mt-2">Try going back to the snippets list.</p>
                <Link href="/" className="flex gap-1 justify-center items-center mt-4 text-sm text-blue-600 hover:underline">
                    <ArrowLeft /> Back to Home
                </Link>
            </div>
        );
    }

    // Delete snippet in sqlite by server action
    const delteSnippetAction = deleteSnippet.bind(null, snippet.id);

    return (
        <main className="max-w-3xl mx-auto px-6 py-12">
            <Link
                href="/"
                className="flex gap-1 items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition mb-6"
            >
                <ArrowLeft /> Back to All Snippets
            </Link>

            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {snippet.title}
                </h1>
                <div className="flex gap-2">
                    <Link href={`/snippet/${id}/edit`}>
                        <Button>Edit</Button>
                    </Link>
                    <Button onClick={delteSnippetAction} variant="destructive">Delete</Button>
                </div>
            </div>

            <div className="rounded-lg overflow-auto border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900 p-4">
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200">
                    <code>{snippet.code}</code>
                </pre>
            </div>
        </main>
    );
};

export default SnippetDetailPage;

// For caching the data of a dynamic route
export const generateStaticParams = async () => {
    const snippets = await prisma.snippet.findMany();

    return snippets.map((snippet) => {
        return { id: snippet.id.toString() };
    })
}