import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cardBase } from '@/lib/styles';

type GlassCardProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export function GlassCard<T extends ElementType = 'div'>({
  as,
  children,
  className = '',
  ...props
}: GlassCardProps<T>) {
  const Component = as ?? 'div';

  return (
    <Component className={`${cardBase} ${className}`} {...props}>
      {children}
    </Component>
  );
}
