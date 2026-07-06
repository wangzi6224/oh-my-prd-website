import type { LucideIcon } from 'lucide-react';

export function SectionLabel({
  index,
  label,
  icon: Icon,
}: {
  index: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#78e4ee]">
      <span className="font-mono text-[#5b6b6e]">{index}</span>
      <Icon aria-hidden="true" className="size-4" />
      <span>{label}</span>
    </div>
  );
}
