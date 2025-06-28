import { deleteSnippet } from "@/actions";
import CodeBlock from "@/components/CodeBlock";
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
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-12 text-center">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                    Snippet not found
                </h1>
                <p className="text-gray-500 mt-2 text-sm sm:text-base">Go back to Home.</p>
                <Link href="/" className="flex gap-1 justify-center items-center mt-4 text-sm text-blue-600 hover:underline">
                    <ArrowLeft /> Back to Home
                </Link>
            </div>
        );
    }

    // Delete snippet in sqlite by server action
    const delteSnippetAction = deleteSnippet.bind(null, snippet.id);

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-10 pt-5 sm:pt-7">
            <Link
                href="/"
                className="flex gap-1 items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition mb-6"
            >
                <ArrowLeft /> Back to All Snippets
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 mb-4">
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white break-words">
                    {snippet.title}
                </h1>
                {/* Shown Edit and delete Btn above the content only in desktop */}
                <div className="hidden sm:flex gap-2">
                    <Link href={`/snippet/${id}/edit`}>
                        <Button>Edit</Button>
                    </Link>
                    <Button onClick={delteSnippetAction} variant="destructive">
                        Delete
                    </Button>
                </div>
            </div>

            <CodeBlock code={snippet.code} />

            {/* Show Edit and delete Btn below the content in mobile only  */}
            <div className="flex sm:hidden flex-col gap-2 mt-6">
                <Link href={`/snippet/${id}/edit`}>
                    <Button className="w-full">Edit</Button>
                </Link>
                <Button onClick={delteSnippetAction} variant="destructive" className="w-full">
                    Delete
                </Button>
            </div>
        </div>
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
