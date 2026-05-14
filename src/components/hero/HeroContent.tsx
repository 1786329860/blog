import type { SocialLink } from '@/types';
import { primaryButton, linkButton } from '@/lib/styles';
import { Icon } from '../ui/Icon';

type HeroContentProps = {
  socialLinks: SocialLink[];
};

export function HeroContent({ socialLinks }: HeroContentProps) {
  return (
    <div className="max-w-3xl pt-10 text-center lg:pt-16 lg:text-left">
      <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-2 text-xs font-black uppercase tracking-[0.26em] text-azure-700 shadow-sm backdrop-blur">
        <Icon name="sparkle" className="h-4 w-4" />
        街喧嚣，人过往
      </p>
      <h1 className="hero-title text-6xl font-black leading-[0.95] sm:text-7xl lg:text-[6.8rem]">
        <span className="hero-word-dark">写代码</span>
        <span className="text-azure-600">.</span>{' '}
        <span className="hero-word-dark">记生活</span>
        <span className="text-azure-600">.</span>{' '}
        <span className="hero-word-blue">留痕迹</span>
        <span className="text-azure-500">.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-ink-soft sm:text-xl">
        在喧嚣的街头，人来人往，我用代码和文字记录下每一个灵感的瞬间。
      </p>
      <p className="mt-3 text-base font-semibold text-ink-soft/90">
        前端开发者的数字花园，种下想法，等它开花。
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
        <a href="#articles" className={primaryButton}>
          <Icon name="article" className="h-5 w-5" />
          阅读文章
          <Icon name="arrowRight" className="h-4 w-4" />
        </a>
        <a href="#projects" className={linkButton}>
          <Icon name="folder" className="h-5 w-5" />
          查看项目
        </a>
      </div>

      {socialLinks.length ? (
        <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-ink/90 transition hover:bg-white/60 hover:text-azure-700"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name={link.icon} className="h-5 w-5" />
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
