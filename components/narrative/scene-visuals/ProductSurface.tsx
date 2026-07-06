import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

export function ProductSurface({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'scene-card relative overflow-hidden rounded-[16px] border border-[rgba(194,205,206,0.14)] bg-[linear-gradient(180deg,rgba(19,30,32,0.88),rgba(10,16,18,0.76))] shadow-surface backdrop-blur-xl',
        'before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(20,174,194,0.52),transparent)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
