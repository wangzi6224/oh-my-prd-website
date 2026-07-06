import clsx from 'clsx';

export function BrandMark({
  size = 'md',
  showName = true,
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx('brand-mark inline-flex items-center gap-3', className)}>
      <span
        className={clsx(
          'brand-logo relative inline-flex items-center justify-center overflow-hidden rounded-[10px] bg-[#14aec2] font-bold text-[#061113] shadow-[0_18px_58px_-24px_rgba(20,174,194,0.9)]',
          size === 'sm' && 'size-8 text-xs',
          size === 'md' && 'size-10 text-sm',
          size === 'lg' && 'size-16 rounded-[16px] text-xl',
        )}
      >
        <span className="relative z-10">OP</span>
        <span className="brand-sweep pointer-events-none absolute inset-y-[-20%] left-[-90%] w-1/2 rotate-12 bg-white/40 blur-md" />
      </span>
      {showName ? (
        <span
          className={clsx(
            'brand-name font-semibold text-[#e9f0f1]',
            size === 'lg' ? 'text-2xl' : 'text-sm',
          )}
        >
          Oh My PRD
        </span>
      ) : null}
    </div>
  );
}
