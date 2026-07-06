import clsx from 'clsx';

export type TimelineItem = {
  label: string;
  detail?: string;
  active?: boolean;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="grid gap-3">
      {items.map((item, index) => (
        <li key={`${item.label}-${index}`} className="flex gap-3">
          <span
            className={clsx(
              'mt-1.5 size-2.5 rounded-full border',
              item.active
                ? 'border-[#14aec2] bg-[#14aec2] shadow-[0_0_20px_rgba(20,174,194,0.7)]'
                : 'border-[rgba(194,205,206,0.22)] bg-[rgba(255,255,255,0.04)]',
            )}
          />
          <span className="min-w-0">
            <span className="block text-sm font-medium text-[#e9f0f1]">
              {item.label}
            </span>
            {item.detail ? (
              <span className="mt-0.5 block text-xs text-[#8e9c9e]">
                {item.detail}
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ol>
  );
}
