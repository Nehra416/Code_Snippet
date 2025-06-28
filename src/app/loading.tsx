import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-gray-800 dark:text-gray-200 px-4">
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center rounded-full border border-gray-300 dark:border-zinc-700 p-4">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-600 dark:text-gray-300" />
                </div>
                <p className="text-sm sm:text-base font-medium tracking-tight text-center">
                    Loading your snippets...
                </p>
            </div>
        </div>
    );
}
