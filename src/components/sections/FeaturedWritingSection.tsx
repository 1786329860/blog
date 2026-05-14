import type { Article } from '@/types';
import { sectionShell } from '@/lib/styles';
import { ArticleCard } from '../cards/ArticleCard';
import { SectionHeading } from '../ui/SectionHeading';

type FeaturedWritingSectionProps = {
  articles: Article[];
};

export function FeaturedWritingSection({ articles }: FeaturedWritingSectionProps) {
  if (!articles.length) return null;

  return (
    <section className={`${sectionShell} p-4 sm:p-6`}>
      <SectionHeading id="articles" title="Featured Writing" icon="sparkle" actionLabel="View all articles" actionHref="#" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
