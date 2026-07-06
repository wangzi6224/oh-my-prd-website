import clsx from 'clsx';

export function CoreOrb({
  label = 'Requirement Core',
  sublabel,
  className,
  compact = false,
}: {
  label?: string;
  sublabel?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={clsx(
        'core-orb relative mx-auto flex aspect-square items-center justify-center',
        compact ? 'w-56' : 'w-full max-w-[440px]',
        className,
      )}
    >
      <div className="absolute inset-[8%] rounded-full border border-[rgba(20,174,194,0.24)] opacity-80" />
      <div className="absolute inset-[20%] rounded-full border border-[rgba(194,205,206,0.10)] opacity-80" />
      <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,rgba(20,174,194,0.42),rgba(20,174,194,0.10)_55%,transparent_72%)] blur-md" />
      <div className="core-grid absolute inset-[25%] rounded-full" />
      <div className="relative rounded-full border border-[rgba(20,174,194,0.38)] bg-[#0d1416]/88 px-7 py-5 text-center shadow-glow backdrop-blur-md">
        <span className="block font-mono text-xs text-[#78e4ee]">{label}</span>
        {sublabel ? (
          <span className="mt-1 block max-w-56 text-sm text-[#a6b2b4]">
            {sublabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}
