import React from 'react';
import type { IconName } from '@/types';

type IconProps = {
  name: IconName;
  className?: string;
  strokeWidth?: number;
};

const iconPaths: Partial<Record<IconName, React.ReactNode>> = {
  article: (
    <>
      <path d="M4.5 5.5c2.8-.9 5.2-.5 7 1.2v11.8c-1.8-1.7-4.2-2.1-7-1.2V5.5Z" />
      <path d="M19.5 5.5c-2.8-.9-5.2-.5-7 1.2v11.8c1.8-1.7 4.2-2.1 7-1.2V5.5Z" />
    </>
  ),
  folder: <path d="M3.5 6.5h6l2 2h9v9.5a2 2 0 0 1-2 2h-15v-13.5Z" />,
  github: (
    <>
      <path d="M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.46.08.63-.2.63-.45v-1.6c-2.56.56-3.1-1.1-3.1-1.1-.42-1.05-1.02-1.33-1.02-1.33-.84-.58.06-.56.06-.56.92.06 1.4.94 1.4.94.82 1.4 2.14 1 2.66.77.08-.6.32-1 .58-1.24-2.04-.24-4.18-1.02-4.18-4.54 0-1 .36-1.82.94-2.46-.1-.24-.4-1.18.1-2.44 0 0 .76-.24 2.52.94A8.8 8.8 0 0 1 12 7.33c.78 0 1.56.1 2.3.3 1.75-1.18 2.5-.94 2.5-.94.52 1.26.2 2.2.1 2.44.6.64.95 1.46.95 2.46 0 3.53-2.15 4.3-4.2 4.53.33.28.62.83.62 1.68v2.45c0 .25.17.54.64.45A9.2 9.2 0 0 0 12 2.8Z" />
    </>
  ),
  x: (
    <>
      <path d="M5 5l14 14" />
      <path d="M19 5 5 19" />
    </>
  ),
  juejin: <path d="m4 8 8 5 8-5-8 12L4 8Zm0 0 8-4 8 4" />,
  zhihu: (
    <>
      <path d="M4 7h7M7.5 4v16M5 12h5.5M14 6h6v12h-6zM14 15l6-6" />
    </>
  ),
  star: <path d="m12 3 2.55 5.2 5.75.84-4.16 4.05.98 5.72L12 16.1l-5.12 2.7.98-5.72L3.7 9.04l5.75-.84L12 3Z" />,
  sparkle: <path d="M12 3.5 14 9l5.5 2-5.5 2-2 5.5-2-5.5-5.5-2 5.5-2 2-5.5Z" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="5.8" />
      <path d="m15 15 4.5 4.5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  calendar: (
    <>
      <path d="M6.5 3.5v3M17.5 3.5v3M4.5 8.5h15" />
      <rect x="4.5" y="5.5" width="15" height="15" rx="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  rocket: <path d="M12.5 14.5 9.5 17.5 6 18l.5-3.5 3-3M10 14l-3-3 3.8-3.8c2.25-2.25 4.55-3.35 7.7-3.7-.35 3.15-1.45 5.45-3.7 7.7L11 15Zm5-6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />,
  code: <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />,
  grid: <path d="M5 5h5v5H5zM14 5h5v5h-5zM5 14h5v5H5zM14 14h5v5h-5z" />,
  lightbulb: <path d="M9 18h6M10 21h4M8 14.5c-1.3-1-2-2.5-2-4.1a6 6 0 1 1 12 0c0 1.6-.7 3.1-2 4.1-.7.55-1 1.15-1 2H9c0-.85-.3-1.45-1-2Z" />,
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="6.5" ry="2.8" />
      <path d="M5.5 5.5v13c0 1.55 2.9 2.8 6.5 2.8s6.5-1.25 6.5-2.8v-13M5.5 12c0 1.55 2.9 2.8 6.5 2.8s6.5-1.25 6.5-2.8" />
    </>
  ),
  moon: <path d="M19.5 14.6A7.8 7.8 0 0 1 9.4 4.5a8 8 0 1 0 10.1 10.1Z" />,
  external: <path d="M14 4h6v6M20 4l-9 9M19 14v5H5V5h5" />,
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.7 3.15-5.6 7-5.6s6.2 1.9 7 5.6" />
    </>
  ),
  paperPlane: <path d="M21 3 9.5 14.5M21 3l-6.6 18-4.1-8.2L2 8.7 21 3Z" />,
  next: <path d="M7 4.5h10v15H7zM9.2 15.5V8.8l5.6 6.7V8.5" />,
  react: (
    <>
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="9" ry="3.7" />
      <ellipse cx="12" cy="12" rx="9" ry="3.7" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.7" transform="rotate(120 12 12)" />
    </>
  ),
  typescript: <path d="M4 4h16v16H4zM8 9h7M11.5 9v8M16 16.2c.55.45 1.2.7 1.95.7.85 0 1.55-.42 1.55-1.18 0-1.72-3.15-.9-3.15-3.18 0-1.12.95-1.9 2.2-1.9.7 0 1.3.16 1.8.5" />,
  tailwind: <path d="M4 13c2.1-4.2 5.2-4.2 7.3-1.4 1.25 1.68 2.95 1.86 4.7.55 1-.75 1.7-1.8 2-3.15-2.1 4.2-5.2 4.2-7.3 1.4C9.45 8.72 7.75 8.54 6 9.85 5 10.6 4.3 11.65 4 13Zm2 4c2.1-4.2 5.2-4.2 7.3-1.4 1.25 1.68 2.95 1.86 4.7.55 1-.75 1.7-1.8 2-3.15-2.1 4.2-5.2 4.2-7.3 1.4-1.25-1.68-2.95-1.86-4.7-.55-1 .75-1.7 1.8-2 3.15Z" />,
  prisma: <path d="M12 3 20 19.5 9 21 4 15 12 3Zm0 3.8L9.1 18.4l8-1.1L12 6.8Z" />,
  framer: <path d="M6 4h12v5H11l7 6H6v-5h7L6 4Zm0 11h7v5H6v-5Z" />,
  shadcn: <path d="M6 18 18 6M10 20 20 10" />,
  openai: <path d="M12 4.5a4 4 0 0 1 6.7 3.7 4 4 0 0 1 .1 7.25 4 4 0 0 1-6.2 4.2 4 4 0 0 1-6.7-3.7 4 4 0 0 1-.1-7.25 4 4 0 0 1 6.2-4.2Z" />,
  schema: <path d="M4 6h6v6H4zM14 6h6v6h-6zM9 12v3h6v-3M12 15v3" />,
  backend: <path d="M4 7h16M7 7v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7M9 11h6M9 15h6" />,
  frontend: <path d="M4 5h16v14H4zM4 9h16M8 13h4M8 16h8" />,
};

const labelIcons: Partial<Record<IconName, string>> = {
  next: 'N',
  typescript: 'TS',
  shadcn: '/',
};

export function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.8 }: IconProps) {
  const text = labelIcons[name];

  if (text) {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex items-center justify-center rounded-lg bg-ink text-[10px] font-black leading-none text-white ${className}`}
      >
        {text}
      </span>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {iconPaths[name] ?? iconPaths.sparkle}
    </svg>
  );
}
