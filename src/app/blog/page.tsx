import { ArticleCard } from '@/components/cards/ArticleCard';
import { Icon } from '@/components/ui/Icon';
import { Pill } from '@/components/ui/Pill';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { formatDate } from '@/lib/utils';
import type { IconName } from '@/types';

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: string;
  readTime: number;
  viewCount: number;
  category?: { id: string; name: string; slug: string } | null;
  tags: { tag: { id: string; name: string; slug: string } }[];
  _count: { comments: number };
};

type ApiResponse = {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const iconMap: Record<string, IconName> = {
  前端: 'frontend',
  后端: 'backend',
  React: 'react',
  TypeScript: 'typescript',
  Tailwind: 'tailwind',
  数据库: 'database',
  算法: 'code',
  设计: 'lightbulb',
  工具: 'grid',
  思考: 'lightbulb',
  教程: 'rocket',
};

const accentMap: Record<string, 'blue' | 'cyan' | 'indigo' | 'moon'> = {
  前端: 'cyan',
  后端: 'indigo',
  React: 'blue',
  TypeScript: 'indigo',
  Tailwind: 'cyan',
  数据库: 'moon',
  算法: 'blue',
  设计: 'cyan',
  工具: 'moon',
  思考: 'indigo',
  教程: 'blue',
};

function getIcon(category?: string | null): IconName {
  if (!category) return 'article';
  return iconMap[category] ?? 'article';
}

function getAccent(category?: string | null) {
  if (!category) return 'blue';
  return accentMap[category] ?? 'blue';
}

export const metadata = {
  title: '博客文章 — 街喧嚣，人过往',
  description: '浏览所有博客文章，涵盖前端、后端、设计、工具等领域',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; tag?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const category = params.category || '';
  const tag = params.tag || '';
  const search = params.search || '';

  const queryParams = new URLSearchParams();
  queryParams.set('page', String(page));
  queryParams.set('limit', '12');
  if (category) queryParams.set('category', category);
  if (tag) queryParams.set('tag', tag);
  if (search) queryParams.set('search', search);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts?${queryParams.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div className="mx-container mt-20 text-center">
        <p className="text-lg font-bold text-ink-soft">加载失败，请稍后重试</p>
      </div>
    );
  }

  const data: ApiResponse = await res.json();
  const { posts, pagination } = data;

  const allCategories = [...new Map(posts.map((p) => p.category).filter(Boolean).map((c) => [c!.slug, c!])).values()];

  const allTags = [...new Set(posts.flatMap((p) => p.tags.map((t) => t.tag)))];

  const articles = posts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.excerpt,
    href: `/blog/${post.slug}`,
    category: post.category?.name ?? '未分类',
    date: formatDate(post.publishedAt),
    readTime: `${post.readTime} 分钟阅读`,
    tags: post.tags.map((t) => t.tag.name),
    icon: getIcon(post.category?.name),
    accent: getAccent(post.category?.name),
  }));

  return (
    <main className="mx-container min-h-screen py-10 sm:py-14">
      <div className="glass-panel rounded-[2rem] p-5 sm:p-8">
        <SectionHeading eyebrow="BLOG" title="所有文章" icon="article" />

        <form method="GET" action="/blog" className="mt-6" role="search">
          <div className="relative">
            <Icon name="search" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-azure-400" />
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="搜索文章标题或摘要..."
              className="focus-ring w-full rounded-2xl border border-azure-100 bg-white/60 py-3.5 pl-12 pr-4 text-sm font-medium text-ink placeholder:text-ink-soft/50 backdrop-blur-sm transition focus:border-azure-300 focus:bg-white"
            />
          </div>
          <input type="hidden" name="category" value={category} />
          <input type="hidden" name="tag" value={tag} />
        </form>

        {allCategories.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-ink-soft">分类：</span>
            <form method="GET" action="/blog" className="inline-flex flex-wrap gap-2">
              <input type="hidden" name="search" value={search} />
              <button
                type="submit"
                name="category"
                value=""
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                  !category
                    ? 'bg-azure-600 text-white shadow-md'
                    : 'border border-azure-200 bg-white/70 text-ink-soft hover:bg-azure-50'
                }`}
              >
                全部
              </button>
              {allCategories.map((cat) => (
                <button
                  key={cat.slug}
                  type="submit"
                  name="category"
                  value={cat.slug}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                    category === cat.slug
                      ? 'bg-azure-600 text-white shadow-md'
                      : 'border border-azure-200 bg-white/70 text-ink-soft hover:bg-azure-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </form>
          </div>
        )}

        {allTags.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-ink-soft">标签：</span>
            <form method="GET" action="/blog" className="inline-flex flex-wrap gap-2">
              <input type="hidden" name="search" value={search} />
              <input type="hidden" name="category" value={category} />
              {allTags.slice(0, 12).map((t) => (
                <button
                  key={t.id}
                  type="submit"
                  name="tag"
                  value={t.slug}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    tag === t.slug
                      ? 'bg-azure-100 text-azure-700 ring-1 ring-azure-300'
                      : 'text-ink-soft hover:bg-azure-50/70'
                  }`}
                >
                  #{t.name}
                </button>
              ))}
            </form>
          </div>
        )}

        {articles.length === 0 ? (
          <div className="mt-16 text-center">
            <Icon name="article" className="mx-auto h-12 w-12 text-azure-300" />
            <p className="mt-4 text-base font-bold text-ink-soft">没有找到匹配的文章</p>
            <p className="mt-1 text-sm text-ink-soft/60">试试其他关键词或筛选条件</p>
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.href} article={article} />
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <nav aria-label="分页导航" className="mt-10 flex items-center justify-center gap-3">
                {page > 1 && (
                  <a
                    href={`/blog?page=${page - 1}&category=${category}&tag=${tag}&search=${encodeURIComponent(search)}`}
                    className="link-button inline-flex items-center gap-1.5"
                  >
                    <Icon name="arrowRight" className="h-4 w-4 rotate-180" />
                    上一页
                  </a>
                )}

                <span className="px-4 py-2 text-sm font-bold text-ink">
                  第 <span className="text-azure-700">{page}</span> / {pagination.totalPages} 页
                </span>

                {page < pagination.totalPages && (
                  <a
                    href={`/blog?page=${page + 1}&category=${category}&tag=${tag}&search=${encodeURIComponent(search)}`}
                    className="link-button inline-flex items-center gap-1.5"
                  >
                    下一页
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </a>
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </main>
  );
}
