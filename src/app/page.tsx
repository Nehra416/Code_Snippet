import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const snippets = await prisma.snippet.findMany();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 pt-6">
      <header className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white">
          Code Snippets
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
          Your personal library of reusable code, cleanly organized and always accessible.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
          All Snippets
        </h2>
        <Link href="/snippet/new">
          <Button className="w-full sm:w-auto transition-all hover:scale-105 flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" /> New Snippet
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {
          snippets.length > 0 ? (
            snippets.map((snippet) => (
              <div
                key={snippet.id}
                className="group bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 sm:p-6 rounded-lg shadow-sm transition hover:shadow-md hover:border-gray-300 dark:hover:border-zinc-700"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white">
                      {snippet.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Click to view or edit this snippet.
                    </p>
                  </div>
                  <Link href={`/snippet/${snippet.id}`}>
                    <Button variant="ghost" className="text-sm font-medium w-full sm:w-auto mt-2 sm:mt-0">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No snippets found. Start by adding a new one.</p>
          )}
      </div>
    </div>
  );
}
