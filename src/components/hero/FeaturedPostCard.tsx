import type { FeaturedPost } from '@/types';
import { GlassCard } from '../cards/GlassCard';
import { Icon } from '../ui/Icon';
import { Pill } from '../ui/Pill';

type FeaturedPostCardProps = {
  post: FeaturedPost;
};

function MiniLandscape() {
  return (
    <div className="relative h-28 w-full overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br from-azure-600 via-azure-300 to-white shadow-soft sm:h-32 sm:w-36 sm:shrink-0">
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-azure-800/50 to-transparent" />
      <div className="absolute left-5 top-8 h-10 w-20 rounded-full bg-white/80 blur-sm" />
      <div className="absolute left-12 top-5 h-8 w-16 rounded-full bg-white/80 blur-sm" />
      <div className="absolute bottom-5 left-0 right-0 h-px bg-white/80" />
      <div className="absolute bottom-7 left-8 h-px w-20 rotate-[-8deg] bg-white/80" />
      <Icon name="paperPlane" className="absolute right-5 top-4 h-6 w-6 rotate-12 text-white" />
    </div>
  );
}

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  return (
    <GlassCard className="relative overflow-hidden p-5">
      <Icon name="star" className="absolute right-4 top-4 h-10 w-10 rotate-12 text-yellow-200 drop-shadow" />
      <div className="mb-4 flex items-center gap-2 text-sm font-black text-azure-700">
        <Icon name="star" className="h-5 w-5" />
        Featured Post
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <MiniLandscape />
        <div className="min-w-0 flex-1">
          <a href={post.href} className="text-lg font-black leading-snug text-ink transition hover:text-azure-700">
            {post.title}
          </a>
          <p className="mt-2 text-sm font-medium leading-6 text-ink-soft">{post.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-ink-soft">
            <Pill>{post.category}</Pill>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="calendar" className="h-4 w-4 text-azure-600" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="clock" className="h-4 w-4 text-azure-600" />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
