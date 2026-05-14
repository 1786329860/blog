import type { CurrentProject, FeaturedPost, SocialLink, TechItem } from '@/types';
import { HeroCardStack } from './HeroCardStack';
import { HeroContent } from './HeroContent';

type HeroSectionProps = {
  socialLinks: SocialLink[];
  featuredPost?: FeaturedPost;
  currentProject?: CurrentProject;
  techStack: TechItem[];
};

export function HeroSection({ socialLinks, featuredPost, currentProject, techStack }: HeroSectionProps) {
  return (
    <section id="top" className="relative z-10 pt-4 sm:pt-8 lg:pt-10">
      <div className="mx-container grid min-h-[31rem] items-center gap-8 pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(520px,0.95fr)] lg:pb-20">
        <HeroContent socialLinks={socialLinks} />
        <div className="lg:pt-8">
          <HeroCardStack featuredPost={featuredPost} currentProject={currentProject} techStack={techStack} />
        </div>
      </div>
    </section>
  );
}
