import clsx from 'clsx';

export function CodeBlock({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <pre
      className={clsx(
        'overflow-hidden rounded-[12px] border border-[rgba(194,205,206,0.12)] bg-[#091012]/80 p-4 font-mono text-xs leading-6 text-[#a6b2b4]',
        className,
      )}
    >
      {lines.map((line, index) => (
        <code key={`${line}-${index}`} className="block">
          <span className="mr-4 text-[#405054]">
            {String(index + 1).padStart(2, '0')}
          </span>
          {line}
        </code>
      ))}
    </pre>
  );
}
