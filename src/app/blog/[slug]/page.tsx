import { ArticleCard } from '@/components/cards/ArticleCard';
import { GlassCard } from '@/components/cards/GlassCard';
import { Icon } from '@/components/ui/Icon';
import { Pill } from '@/components/ui/Pill';
import { formatDate, calculateReadTime } from '@/lib/utils';
import { markdownToHtml } from '@/lib/markdown';
import { CommentForm } from '@/components/CommentForm';
import type { Metadata } from 'next';
import Link from 'next/link';

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: string;
  readTime: number;
  viewCount: number;
  isTop: boolean;
  author: { id: string; name: string; email: string; avatar?: string; bio?: string };
  category?: { id: string; name: string; slug: string } | null;
  tags: { tag: { id: string; name: string; slug: string } }[];
  comments: {
    id: string;
    content: string;
    createdAt: string;
    author: { id: string; name: string; avatar?: string };
  }[];
};

type TocItem = {
  id: string;
  text: string;
  level: number;
};

function extractToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  const regex = /<h([2-4])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h\1>/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    items.push({
      id: match[2],
      level: parseInt(match[1]),
      text: match[3].replace(/<[^>]+>/g, ''),
    });
  }

  return items;
}

async function getAdjacentPosts(currentSlug: string): Promise<{ prev: Post | null; next: Post | null }> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts?limit=100`, {
      cache: 'no-store',
    });
    if (!res.ok) return { prev: null, next: null };
    const data = await res.json();
    const allPosts: Post[] = data.posts;
    const currentIndex = allPosts.findIndex((p) => p.slug === currentSlug);

    return {
      prev: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
      next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
    };
  } catch {
    return { prev: null, next: null };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return { title: '文章未找到' };
    const post: Post = await res.json();
    return {
      title: `${post.title} — 街喧嚣，人过往`,
      description: post.excerpt,
    };
  } catch {
    return { title: '文章未找到' };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div className="mx-container flex min-h-[60vh] items-center justify-center">
        <div className="glass-panel rounded-[2rem] p-12 text-center">
          <Icon name="article" className="mx-auto h-16 w-16 text-azure-300" />
          <h1 className="mt-6 text-2xl font-black text-ink">文章不存在</h1>
          <p className="mt-2 text-sm text-ink-soft">该文章可能已被删除或链接有误</p>
          <a href="/blog" className="link-button mt-6 inline-flex">
            <Icon name="arrowRight" className="h-4 w-4 rotate-180" />
            返回文章列表
          </a>
        </div>
      </div>
    );
  }

  const post: Post = await res.json();
  const htmlContent = await markdownToHtml(post.content);
  const tocItems = extractToc(htmlContent);
  const { prev, next } = await getAdjacentPosts(slug);

  return (
    <main className="mx-container min-h-screen py-10 sm:py-14">
      <div className="glass-panel rounded-[2rem] p-5 sm:p-8 lg:p-10">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-azure-600 transition hover:text-azure-800"
        >
          <Icon name="arrowRight" className="h-4 w-4 rotate-180" />
          返回文章列表
        </Link>

        <article className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-10">
          <div>
            <header className="mb-8">
              {post.category && (
                <Pill className="mb-3">{post.category.name}</Pill>
              )}
              <h1 className="text-2xl font-black leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 text-base font-medium leading-relaxed text-ink-soft sm:text-lg">
                {post.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-azure-100/80 pt-5 text-sm font-semibold text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="calendar" className="h-4 w-4 text-azure-600" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="clock" className="h-4 w-4 text-azure-600" />
                  {post.readTime} 分钟阅读
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="sparkle" className="h-4 w-4 text-azure-600" />
                  {post.viewCount} 次阅读
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="user" className="h-4 w-4 text-azure-600" />
                  {post.author.name}
                </span>
              </div>

              {post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <Pill key={t.tag.id}>{t.tag.name}</Pill>
                  ))}
                </div>
              )}
            </header>

            <div
              className="prose prose-slate max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {(prev || next) && (
              <nav aria-label="上下篇文章" className="mt-12 grid gap-4 sm:grid-cols-2">
                {prev ? (
                  <a
                    href={`/blog/${prev.slug}`}
                    className="group rounded-2xl border border-azure-100 bg-white/50 p-5 transition hover:border-azure-300 hover:bg-white hover:shadow-soft"
                  >
                    <span className="text-xs font-bold text-azure-500">上一篇</span>
                    <p className="mt-1 font-bold text-ink transition group-hover:text-azure-700">
                      {prev.title}
                    </p>
                  </a>
                ) : (
                  <div />
                )}
                {next ? (
                  <a
                    href={`/blog/${next.slug}`}
                    className="group rounded-2xl border border-azure-100 bg-white/50 p-5 text-right transition hover:border-azure-300 hover:bg-white hover:shadow-soft"
                  >
                    <span className="text-xs font-bold text-azure-500">下一篇</span>
                    <p className="mt-1 font-bold text-ink transition group-hover:text-azure-700">
                      {next.title}
                    </p>
                  </a>
                ) : (
                  <div />
                )}
              </nav>
            )}

            <section id="comments" className="mt-14">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-black text-ink">
                <Icon name="mail" className="h-5 w-5 text-azure-600" />
                评论 ({post.comments.length})
              </h2>

              <CommentForm postId={post.id} />

              {post.comments.length > 0 ? (
                <div className="mt-8 space-y-5">
                  {post.comments.map((comment) => (
                    <GlassCard key={comment.id} className="p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-azure-100 to-white text-xs font-bold text-azure-700">
                          {comment.author.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-ink">{comment.author.name}</span>
                            <span className="text-xs text-ink-soft/60">{formatDate(comment.createdAt)}</span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{comment.content}</p>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-center text-sm text-ink-soft/60">暂无评论，快来发表第一条吧～</p>
              )}
            </section>
          </div>

          {tocItems.length > 0 && (
            <aside className="hidden lg:block">
              <nav aria-label="目录" className="sticky top-28">
                <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-azure-500">目录</h3>
                <ul className="space-y-1.5 border-l border-azure-100 pl-4">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block text-sm leading-snug transition hover:text-azure-700 ${
                          item.level === 2
                            ? 'font-semibold text-ink'
                            : item.level === 3
                              ? 'pl-3 text-sm font-medium text-ink-soft'
                              : 'pl-6 text-xs text-ink-soft/70'
                        }`}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}
        </article>
      </div>
    </main>
  );
}

