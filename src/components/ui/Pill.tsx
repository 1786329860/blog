import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  className?: string;
};

export function Pill({ children, className = "" }: PillProps) {
  return <span className={`blue-chip ${className}`}>{children}</span>;
}
