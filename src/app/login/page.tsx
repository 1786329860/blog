'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { DecorativeBackground } from '@/components/decorations/DecorativeBackground';
import { Icon } from '@/components/ui/Icon';

export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('请输入邮箱地址');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('请输入有效的邮箱地址');
      return;
    }

    if (!password) {
      setError('请输入密码');
      return;
    }

    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/');
        router.refresh();
      }
    } catch {
      setError('登录失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper text-ink dark:bg-slate-950 dark:text-slate-100">
      <DecorativeBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="glass-card w-full max-w-md p-8 sm:p-10">
          <div className="mb-8 text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.26em] text-azure-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-azure-300">
              <Icon name="sparkle" className="h-4 w-4" />
              街喧嚣，人过往
            </p>
            <h1 className="hero-title mt-4 text-4xl font-black leading-tight sm:text-5xl">
              <span className="hero-word-dark">欢迎回来</span>
            </h1>
            <p className="mt-3 text-base font-medium text-ink-soft/80 dark:text-slate-400">
              登录你的账户，继续记录灵感
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-ink/80 dark:text-slate-300">
                邮箱地址
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
                className="focus-ring w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3.5 text-sm font-medium text-ink placeholder:text-ink-soft/40 backdrop-blur-sm transition focus:border-azure-400 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-azure-400 dark:focus:bg-white/10"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-bold text-ink/80 dark:text-slate-300">
                密码
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="focus-ring w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3.5 text-sm font-medium text-ink placeholder:text-ink-soft/40 backdrop-blur-sm transition focus:border-azure-400 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-azure-400 dark:focus:bg-white/10"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm font-semibold text-red-600 backdrop-blur-sm dark:border-red-800/30 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="primary-button w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                  </svg>
                  登录中...
                </span>
              ) : (
                <>
                  <Icon name="user" className="h-5 w-5" />
                  登录
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-white/30 pt-6 text-center dark:border-white/10">
            <p className="text-sm font-medium text-ink-soft/70 dark:text-slate-400">
              还没有账户？{' '}
              <a
                href="/register"
                className="font-bold text-azure-600 transition hover:text-azure-700 dark:text-azure-400 dark:hover:text-azure-300"
              >
                立即注册
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
