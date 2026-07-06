import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function GlassCard({
  className,
  interactive = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={clsx(
        'rounded-[14px] border border-[rgba(194,205,206,0.14)] bg-[rgba(19,30,32,0.72)] shadow-surface backdrop-blur-md',
        'transition-[border-color,box-shadow,transform] duration-200',
        interactive &&
          'hover:-translate-y-0.5 hover:border-[rgba(20,174,194,0.42)] hover:shadow-glow',
        className,
      )}
      {...props}
    />
  );
}
