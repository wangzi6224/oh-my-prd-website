import clsx from 'clsx';

const statusLabels: Record<string, string> = {
  draft: 'draft',
  prd_draft: 'prd_draft',
  ai_reviewed: 'ai_reviewed',
  approved: 'approved',
  published: 'published',
  ready_for_dev: 'ready_for_dev',
};

export function StatusPill({
  status,
  active = false,
}: {
  status: string;
  active?: boolean;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none',
        active
          ? 'border-[rgba(20,174,194,0.48)] bg-[rgba(20,174,194,0.16)] text-[#78e4ee]'
          : 'border-[rgba(194,205,206,0.14)] bg-[rgba(255,255,255,0.03)] text-[#8e9c9e]',
      )}
    >
      {statusLabels[status] ?? status}
    </span>
  );
}
