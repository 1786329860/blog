import { DecorativeBackground } from "@/components/decorations/DecorativeBackground";
import { HeroSection } from "@/components/hero/HeroSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BottomPreview } from "@/components/sections/BottomPreview";
import { FeaturedWritingSection } from "@/components/sections/FeaturedWritingSection";
import { SelectedProjectsSection } from "@/components/sections/SelectedProjectsSection";
import { TopicsSection } from "@/components/sections/TopicsSection";
import {
  articles,
  currentProject,
  featuredPost,
  navItems,
  projects,
  socialLinks,
  techStack,
  topics,
} from "@/data/home";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-paper text-ink dark:bg-slate-950 dark:text-slate-100">
      <DecorativeBackground />
      <SiteHeader navItems={navItems} />
      <main className="relative z-10">
        <HeroSection
          socialLinks={socialLinks}
          featuredPost={featuredPost}
          currentProject={currentProject}
          techStack={techStack}
        />

        <div className="mx-container -mt-8 space-y-4 pb-4 sm:-mt-10 lg:-mt-14">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_21rem]">
            <FeaturedWritingSection articles={articles} />
            <TopicsSection topics={topics} />
          </div>
          <SelectedProjectsSection projects={projects} />
          <BottomPreview />
        </div>
      </main>
      <SiteFooter socialLinks={socialLinks} />
    </div>
  );
}
