'use client';

import { primaryButton } from '@/lib/styles';
import { Icon } from '../ui/Icon';

type AboutPreviewProps = {
  title?: string;
  description?: string;
};

export function AboutPreview({
  title = 'About Me',
  description = 'A frontend developer and creator who loves building elegant products and sharing ideas.',
}: AboutPreviewProps) {
  return (
    <section id="about" className="glass-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
      <Icon name="sparkle" className="absolute right-7 top-6 h-8 w-8 text-azure-300" />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex-1">
          <h2 className="inline-flex items-center gap-2 text-xl font-black text-ink">
            <Icon name="user" className="h-5 w-5 text-azure-600" />
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-sm font-medium leading-7 text-ink-soft">{description}</p>
        </div>
        <div className="relative mx-auto h-32 w-32 shrink-0 rounded-full border border-white/70 bg-gradient-to-br from-azure-50 via-white to-azure-200 shadow-card">
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-ink to-azure-700" />
          <div className="absolute left-1/2 top-10 h-14 w-20 -translate-x-1/2 rounded-b-full rounded-t-[2rem] bg-slate-900" />
          <div className="absolute bottom-5 left-1/2 h-10 w-20 -translate-x-1/2 rounded-[2rem] bg-white/85" />
          <span className="absolute -right-12 top-4 hidden rotate-6 font-semibold italic text-azure-600 sm:block">
            Keep<br />Curious
          </span>
        </div>
      </div>
    </section>
  );
}

export function MessageBoardCard() {
  return (
    <section className="glass-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
      <Icon name="paperPlane" className="absolute right-7 top-6 h-12 w-12 rotate-12 text-azure-500" />
      <div className="max-w-2xl">
        <h2 className="inline-flex items-center gap-2 text-xl font-black text-ink">
          <Icon name="mail" className="h-5 w-5 text-azure-600" />
          留言板
        </h2>
        <p className="mt-3 text-sm font-medium leading-7 text-ink-soft">
          有什么想说的？给我留个言吧。
        </p>
        <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="message-content">
            留言内容
          </label>
          <input
            id="message-content"
            type="text"
            placeholder="写下你的想法..."
            className="min-h-12 flex-1 rounded-2xl border border-azure-100 bg-white/80 px-4 text-sm font-semibold text-ink outline-none transition placeholder:text-ink-soft/60 focus:border-azure-400 focus:ring-2 focus:ring-azure-200"
          />
          <button type="submit" className={primaryButton}>
            发送
          </button>
        </form>
      </div>
    </section>
  );
}

export function BottomPreview() {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
      <AboutPreview />
      <MessageBoardCard />
    </div>
  );
}
