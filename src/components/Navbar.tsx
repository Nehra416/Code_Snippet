'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Home, Plus } from 'lucide-react';

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-30 w-full border-b border-gray-200 dark:border-zinc-800 backdrop-blur bg-white/70 dark:bg-zinc-900/70">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                <Link href="/" className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                    CodeSnippet
                </Link>

                {/* Navigation Btns */}
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <Button
                            variant={pathname === '/' ? 'default' : 'ghost'}
                            className={cn('text-sm px-3 flex gap-1 items-center')}
                        >
                            <Home />
                            <span className='hidden sm:block'>Home</span>
                        </Button>
                    </Link>

                    <Link href="/snippet/new">
                        <Button
                            variant={pathname === '/snippet/new' ? 'default' : 'ghost'}
                            className={cn('text-sm px-3 flex items-center gap-1')}
                        >
                            <Plus />
                            <span className='hidden sm:block'>New</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
