import type { Project } from '@/types';
import { sectionShell } from '@/lib/styles';
import { ProjectCard } from '../cards/ProjectCard';
import { SectionHeading } from '../ui/SectionHeading';

type SelectedProjectsSectionProps = {
  projects: Project[];
};

export function SelectedProjectsSection({ projects }: SelectedProjectsSectionProps) {
  if (!projects.length) return null;

  return (
    <section className={`${sectionShell} p-4 sm:p-6`}>
      <SectionHeading id="projects" title="Selected Projects" icon="rocket" actionLabel="View all projects" actionHref="#" />
      <div className="grid gap-4 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
