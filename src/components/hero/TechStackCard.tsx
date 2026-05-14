import type { TechItem } from '@/types';
import { GlassCard } from '../cards/GlassCard';
import { Icon } from '../ui/Icon';

type TechStackCardProps = {
  items: TechItem[];
};

export function TechStackCard({ items }: TechStackCardProps) {
  if (!items.length) return null;

  return (
    <GlassCard className="relative h-full overflow-hidden p-5 text-white shadow-glow">
      <div className="absolute inset-0 bg-gradient-to-br from-azure-700/90 via-azure-500/75 to-white/20" />
      <div className="sketch-line absolute inset-0 opacity-35" />
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="inline-flex items-center gap-2 text-lg font-black">
            <Icon name="star" className="h-5 w-5" />
            Tech Stack
          </h3>
          <span className="text-2xl font-light">+</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/30 px-3 py-3 text-sm font-bold text-white shadow-sm backdrop-blur transition hover:bg-white/40"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-azure-700 shadow-sm">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
