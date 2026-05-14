'use client';

import { Icon } from '../ui/Icon';

function Cloud({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute rounded-full bg-white/70 blur-sm ${className}`}>
      <span className="absolute -left-8 bottom-0 h-12 w-24 rounded-full bg-white/70" />
      <span className="absolute left-8 -top-8 h-20 w-28 rounded-full bg-white/75" />
      <span className="absolute right-0 -top-5 h-16 w-24 rounded-full bg-white/70" />
    </div>
  );
}

function DashedTrail({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 380 160"
      className={`absolute text-white/70 ${className}`}
      fill="none"
    >
      <path
        d="M7 138C69 64 119 173 177 93c38-52-21-86 52-87 79 0 76 120 145 61"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 10"
      />
    </svg>
  );
}

export function DecorativeBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[34rem] bg-hero-sky" />
      <div className="absolute inset-x-0 top-[28rem] h-32 bg-gradient-to-b from-white/0 via-white/70 to-white" />
      <div className="sketch-line absolute inset-x-0 top-0 h-[31rem] opacity-40" />

      <Cloud className="left-[-3rem] top-40 h-20 w-56 opacity-85" />
      <Cloud className="right-[6%] top-44 h-16 w-52 opacity-70" />
      <Cloud className="left-[26%] top-[23rem] h-12 w-40 opacity-75" />
      <Cloud className="right-[31%] top-[22rem] h-12 w-48 opacity-60" />

      <DashedTrail className="left-[42%] top-24 h-44 w-96 opacity-80" />
      <DashedTrail className="-left-8 top-72 h-48 w-96 rotate-[-8deg] opacity-50" />

      <Icon name="paperPlane" className="absolute left-[6%] top-72 h-20 w-20 rotate-[-18deg] animate-float text-white drop-shadow-lg sm:h-28 sm:w-28" />
      <Icon name="paperPlane" className="absolute right-[40%] top-24 h-12 w-12 rotate-[14deg] animate-float text-white/90 drop-shadow-lg [--rotate:14deg]" />
      <Icon name="star" className="absolute left-[10%] top-24 h-10 w-10 rotate-[-12deg] animate-float text-yellow-200 drop-shadow" />
      <Icon name="star" className="absolute right-[10%] top-24 h-7 w-7 animate-float text-yellow-100 drop-shadow" />
      <Icon name="sparkle" className="absolute left-[15%] top-12 h-6 w-6 text-white/80" />
      <Icon name="sparkle" className="absolute right-[26%] top-40 h-5 w-5 text-white" />
      <Icon name="sparkle" className="absolute left-[46%] top-[27rem] h-7 w-7 text-azure-400" />
      <Icon name="sparkle" className="absolute right-[20%] top-[31rem] h-7 w-7 text-azure-400" />

      <div className="absolute left-[-7rem] top-[45rem] h-64 w-64 rounded-full border border-azure-300/45 bg-azure-100/30" />
      <div className="absolute right-[-5rem] top-[43rem] h-72 w-72 rounded-full border border-azure-300/30 bg-azure-100/25" />
      <div className="absolute right-10 top-[28rem] hidden h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(19,112,230,.15)_1px,transparent_1px)] [background-size:12px_12px] lg:block" />

      <div className="absolute right-10 top-32 hidden rotate-6 rounded-3xl border border-white/60 bg-white/30 px-5 py-4 text-center text-sm font-black uppercase leading-tight tracking-wide text-azure-700 shadow-card backdrop-blur-md xl:block">
        Keep<br />Learning<br />Keep<br />Building
      </div>
      <div className="absolute right-20 top-[38rem] hidden rotate-[-8deg] rounded-[2rem] border border-azure-200/70 bg-white/70 px-4 py-3 font-semibold italic text-azure-700 shadow-soft backdrop-blur-md lg:block">
        Ideas<br />become<br />things
      </div>
      <div className="absolute bottom-20 right-12 hidden h-28 w-28 rounded-[2rem] border border-azure-200/70 bg-gradient-to-br from-azure-500 to-azure-700 shadow-glow lg:block">
        <span className="absolute left-5 top-7 h-12 w-16 rounded-lg bg-white/80" />
        <span className="absolute left-8 top-11 h-1 w-10 rounded-full bg-azure-300" />
        <span className="absolute left-4 bottom-4 h-7 w-20 rounded-xl bg-white/40" />
      </div>
    </div>
  );
}
