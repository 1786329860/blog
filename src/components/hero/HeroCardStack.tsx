import type { CurrentProject, FeaturedPost, TechItem } from '@/types';
import { CurrentProjectCard } from './CurrentProjectCard';
import { FeaturedPostCard } from './FeaturedPostCard';
import { TechStackCard } from './TechStackCard';

type HeroCardStackProps = {
  featuredPost?: FeaturedPost;
  currentProject?: CurrentProject;
  techStack: TechItem[];
};

export function HeroCardStack({ featuredPost, currentProject, techStack }: HeroCardStackProps) {
  return (
    <div className="grid items-stretch gap-4 lg:grid-cols-[1.1fr_0.8fr]">
      <div className="grid gap-4">
        {featuredPost ? <FeaturedPostCard post={featuredPost} /> : null}
        {currentProject ? <CurrentProjectCard project={currentProject} /> : null}
      </div>
      <TechStackCard items={techStack} />
    </div>
  );
}
