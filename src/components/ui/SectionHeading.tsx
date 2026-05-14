import { Icon } from './Icon';
import type { IconName } from '@/types';

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  icon?: IconName;
  actionLabel?: string;
  actionHref?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  icon = 'sparkle',
  actionLabel,
  actionHref,
}: SectionHeadingProps) {
  return (
    <div id={id} className="mb-4 flex items-center justify-between gap-4">
      <div>
        {eyebrow ? <p className="text-xs font-black uppercase tracking-[0.24em] text-azure-500">{eyebrow}</p> : null}
        <h2 className="mt-1 inline-flex items-center gap-2 text-xl font-black tracking-tight text-ink sm:text-2xl">
          <Icon name={icon} className="h-5 w-5 text-azure-600" />
          {title}
        </h2>
      </div>
      {actionLabel && actionHref ? (
        <a
          href={actionHref}
          className="hidden items-center gap-2 text-sm font-bold text-azure-600 transition hover:text-azure-800 sm:inline-flex"
        >
          {actionLabel}
          <Icon name="arrowRight" className="h-4 w-4" />
        </a>
      ) : null}
    </div>
  );
}
