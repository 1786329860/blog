'use client';

import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import type { NavItem } from '@/types';
import { focusRing } from '@/lib/styles';
import { Icon } from '../ui/Icon';

type SiteHeaderProps = {
  navItems: NavItem[];
};

export function SiteHeader({ navItems }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <header className="sticky top-3 z-40 px-4 sm:top-5">
      <div className="mx-auto max-w-6xl rounded-full border border-white/70 bg-white/70 px-4 py-3 shadow-glass backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className={`group inline-flex items-center gap-2 ${focusRing}`}>
            <span className="text-lg font-black tracking-tight text-ink dark:text-blue-200">街喧嚣</span>
            <Icon name="sparkle" className="h-4 w-4 text-azure-500 transition group-hover:rotate-12" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-5 py-2 text-sm font-bold text-ink transition hover:bg-white/70 hover:text-azure-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400 ${
                  index === 0 ? 'bg-white/50 text-azure-700 shadow-sm dark:bg-slate-800 dark:text-blue-400' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/50 text-ink shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 ${focusRing}`}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-5 w-5" />
            </button>
            {session?.user ? (
              <div className="flex items-center gap-2">
                <div className="hidden h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/70 bg-gradient-to-br from-azure-100 to-white shadow-sm dark:from-azure-900 dark:to-slate-800 sm:flex">
                  {session.user.image ? (
                    <img src={session.user.image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-azure-700 dark:text-blue-300">
                      {(session.user.name || 'U').charAt(0)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className={`hidden items-center gap-1.5 rounded-full border border-white/70 bg-white/50 px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-slate-800 dark:text-slate-400 md:inline-flex ${focusRing}`}
                >
                  退出
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className={`hidden items-center gap-1.5 rounded-full border border-white/70 bg-white/50 px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-slate-800 dark:text-slate-400 md:inline-flex ${focusRing}`}
              >
                <Icon name="user" className="h-4 w-4" />
                登录
              </button>
            )}
            <button
              type="button"
              aria-expanded={isOpen}
              aria-label="Open navigation menu"
              onClick={() => setIsOpen((value) => !value)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/50 text-ink shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 md:hidden ${focusRing}`}
            >
              <Icon name={isOpen ? 'close' : 'menu'} className="h-5 w-5" />
            </button>
          </div>
        </div>

        {isOpen ? (
          <nav className="mt-4 grid gap-2 border-t border-azure-100 pt-4 md:hidden" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl bg-white/60 px-4 py-3 text-sm font-bold text-ink transition hover:bg-white dark:bg-slate-800 dark:text-slate-300"
              >
                {item.label}
              </Link>
            ))}
            {!session && (
              <button
                onClick={() => signIn()}
                className="rounded-2xl bg-white/60 px-4 py-3 text-left text-sm font-bold text-azure-700 transition hover:bg-white dark:bg-slate-800 dark:text-blue-400"
              >
                登录 / 注册
              </button>
            )}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
