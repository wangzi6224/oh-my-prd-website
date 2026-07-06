import clsx from 'clsx';

export function FlowConnector({
  direction = 'horizontal',
  className,
}: {
  direction?: 'horizontal' | 'vertical' | 'arc';
  className?: string;
}) {
  if (direction === 'vertical') {
    return (
      <span
        className={clsx(
          'stage-line block h-24 w-px bg-[linear-gradient(180deg,transparent,#14aec2,transparent)] opacity-70 shadow-[0_0_18px_rgba(20,174,194,0.6)]',
          className,
        )}
      />
    );
  }

  if (direction === 'arc') {
    return (
      <span
        className={clsx(
          'stage-line absolute h-px w-40 origin-left bg-[linear-gradient(90deg,transparent,#14aec2,transparent)] opacity-60',
          className,
        )}
      />
    );
  }

  return (
    <span
      className={clsx(
        'stage-line block h-px w-full bg-[linear-gradient(90deg,transparent,#14aec2,transparent)] opacity-70 shadow-[0_0_18px_rgba(20,174,194,0.6)]',
        className,
      )}
    />
  );
}
