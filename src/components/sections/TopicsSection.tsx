import type { Topic } from '@/types';
import { sectionShell } from '@/lib/styles';
import { Icon } from '../ui/Icon';
import { SectionHeading } from '../ui/SectionHeading';

type TopicPillProps = {
  topic: Topic;
};

export function TopicPill({ topic }: TopicPillProps) {
  return (
    <a
      href={topic.href}
      className="group flex items-center gap-3 rounded-2xl border border-azure-100/90 bg-white/70 px-4 py-4 text-sm font-black text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-azure-200 hover:bg-white hover:text-azure-700"
    >
      <Icon name={topic.icon} className="h-5 w-5 text-azure-600 transition group-hover:scale-110" />
      {topic.label}
    </a>
  );
}

type TopicsSectionProps = {
  topics: Topic[];
};

export function TopicsSection({ topics }: TopicsSectionProps) {
  if (!topics.length) return null;

  return (
    <aside className={`${sectionShell} relative overflow-hidden p-4 sm:p-6`}>
      <div className="absolute -right-5 top-8 rotate-[-8deg] rounded-[1.4rem] border border-azure-200/70 bg-white/75 px-4 py-3 text-center text-sm font-black italic leading-tight text-ink-soft shadow-soft">
        Ideas<br />become<br />things
      </div>
      <SectionHeading title="Topics" icon="sparkle" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
        {topics.map((topic) => (
          <TopicPill key={topic.id} topic={topic} />
        ))}
      </div>
    </aside>
  );
}
