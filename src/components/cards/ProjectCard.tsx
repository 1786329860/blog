import type { Project } from '@/types';
import { GlassCard } from './GlassCard';
import { Icon } from '../ui/Icon';
import { Pill } from '../ui/Pill';

type ProjectCardProps = {
  project: Project;
};

const projectMockClasses: Record<NonNullable<Project['accent']>, string> = {
  site: 'from-white via-azure-100 to-azure-500',
  cms: 'from-white via-slate-100 to-azure-200',
  ai: 'from-azure-700 via-azure-500 to-azure-100',
};

function ProjectMockup({ project }: { project: Project }) {
  return (
    <div
      className={`relative h-32 overflow-hidden rounded-2xl border border-white/75 bg-gradient-to-br ${
        projectMockClasses[project.accent ?? 'site']
      } shadow-soft`}
    >
      <div className="absolute left-4 top-4 h-3 w-16 rounded-full bg-white/80" />
      <div className="absolute left-4 top-9 h-16 w-28 rounded-2xl bg-white/70 shadow-sm" />
      <div className="absolute right-5 top-8 h-2 w-20 rounded-full bg-white/80" />
      <div className="absolute right-5 top-14 h-2 w-24 rounded-full bg-white/60" />
      <div className="absolute right-5 top-20 h-2 w-16 rounded-full bg-white/50" />
      <div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs font-black text-azure-700">
        {project.imageLabel}
      </div>
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <GlassCard as="article" className="grid gap-4 p-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:p-5">
      <ProjectMockup project={project} />
      <div className="min-w-0">
        <h3 className="text-lg font-black text-ink">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-ink-soft">{project.description}</p>
        {project.tags.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Pill key={tag}>{tag}</Pill>
            ))}
          </div>
        ) : null}
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-black text-ink">
          <a href={project.href} className="inline-flex items-center gap-1.5 transition hover:text-azure-700">
            <Icon name="github" className="h-4 w-4" />
            GitHub
          </a>
          {project.demoHref ? (
            <a href={project.demoHref} className="inline-flex items-center gap-1.5 transition hover:text-azure-700">
              Demo
              <Icon name="external" className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </GlassCard>
  );
}
