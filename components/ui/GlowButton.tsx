import clsx from 'clsx';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

type GlowButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
};

export function GlowButton({
  className,
  variant = 'secondary',
  children,
  ...props
}: GlowButtonProps) {
  return (
    <a
      className={clsx(
        'inline-flex h-11 items-center justify-center rounded-[12px] px-5 text-sm font-semibold outline-none transition duration-200',
        'focus-visible:ring-2 focus-visible:ring-[#14aec2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1416]',
        variant === 'primary'
          ? 'bg-[#14aec2] text-[#061113] shadow-[0_12px_34px_-18px_rgba(20,174,194,0.9)] hover:bg-[#2fc7d8] hover:shadow-glow'
          : 'border border-[rgba(194,205,206,0.18)] bg-[rgba(19,30,32,0.62)] text-[#e9f0f1] hover:border-[rgba(20,174,194,0.46)] hover:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
