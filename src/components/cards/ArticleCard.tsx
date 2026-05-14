import type { Article } from '@/types';
import { GlassCard } from './GlassCard';
import { Icon } from '../ui/Icon';
import { Pill } from '../ui/Pill';

type ArticleCardProps = {
  article: Article;
};

const accentClasses: Record<NonNullable<Article['accent']>, string> = {
  blue: 'from-azure-100 to-white text-azure-700',
  cyan: 'from-cyan-100 to-white text-cyan-700',
  indigo: 'from-indigo-100 to-white text-indigo-700',
  moon: 'from-blue-100 to-white text-blue-700',
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <GlassCard as="article" className="p-4 sm:p-5">
      <div className="flex gap-4">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${
            accentClasses[article.accent ?? 'blue']
          } shadow-soft`}
        >
          <Icon name={article.icon} className="h-8 w-8" />
        </div>
        <div className="min-w-0 flex-1">
          <a href={article.href} className="text-base font-black leading-snug text-ink transition hover:text-azure-700 sm:text-lg">
            {article.title}
          </a>
          <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-ink-soft">{article.description}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-azure-100/80 pt-4 text-xs font-semibold text-ink-soft">
        <Pill>{article.category}</Pill>
        <span className="inline-flex items-center gap-1.5">
          <Icon name="calendar" className="h-4 w-4 text-azure-600" />
          {article.date}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Icon name="sparkle" className="h-4 w-4 text-azure-600" />
          {article.readTime}
        </span>
      </div>
      {article.tags.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>
      ) : null}
    </GlassCard>
  );
}
