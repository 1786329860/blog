import type { CurrentProject } from '@/types';
import { GlassCard } from '../cards/GlassCard';
import { Icon } from '../ui/Icon';
import { Pill } from '../ui/Pill';

type CurrentProjectCardProps = {
  project: CurrentProject;
};

export function CurrentProjectCard({ project }: CurrentProjectCardProps) {
  return (
    <GlassCard className="relative overflow-hidden p-5">
      <div className="absolute -bottom-5 -right-3 rounded-full border border-azure-200/80 bg-white/70 px-3 py-2 text-xs font-black text-azure-500 shadow-soft">
        wow
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-black text-azure-700">
            <Icon name="rocket" className="h-5 w-5" />
            Current Project
          </div>
          <h3 className="text-xl font-black text-ink">{project.title}</h3>
        </div>
        <span className="rounded-full border border-azure-200 bg-azure-50 px-3 py-1 text-xs font-black text-azure-700">
          {project.status}
        </span>
      </div>
      <p className="mt-3 max-w-md text-sm font-medium leading-6 text-ink-soft">{project.description}</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-azure-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-azure-600 to-azure-300"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <span className="text-sm font-black text-ink-soft">{project.progress}%</span>
      </div>
      {project.tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>
      ) : null}
    </GlassCard>
  );
}
