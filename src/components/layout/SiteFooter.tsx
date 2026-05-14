import type { SocialLink } from '@/types';
import { Icon } from '../ui/Icon';

type SiteFooterProps = {
  socialLinks: SocialLink[];
};

export function SiteFooter({ socialLinks }: SiteFooterProps) {
  return (
    <footer className="relative z-10 py-10 text-center text-sm font-semibold text-ink-soft">
      <div className="mx-container">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 rounded-[2rem] border border-white/70 bg-white/60 px-5 py-5 shadow-soft backdrop-blur-xl sm:flex-row">
          <p>© {new Date().getFullYear()} MX. Build, write, explore.</p>
          {socialLinks.length ? (
            <div className="flex flex-wrap justify-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-azure-100 bg-white/60 text-ink transition hover:-translate-y-0.5 hover:text-azure-700"
                  aria-label={link.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name={link.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
