import { requirementDemo, statusTrack } from '@/content/narrative';
import { StatusPill } from '@/components/ui/StatusPill';
import { ProductSurface } from './ProductSurface';

export function RequirementObjectVisual() {
  const fields = [
    ['title', requirementDemo.title],
    ['priority', requirementDemo.priority],
    ['version', requirementDemo.version],
    ['owner', requirementDemo.owner],
    ['status', requirementDemo.status],
  ];

  return (
    <ProductSurface className="mx-auto max-w-xl p-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#78e4ee]">
            Requirement Object
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-[#e9f0f1]">
            {requirementDemo.title}
          </h3>
        </div>
        <StatusPill status={requirementDemo.status} active />
      </div>
      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        {fields.map(([label, value]) => (
          <div
            key={label}
            className="object-field rounded-[12px] border border-[rgba(194,205,206,0.10)] bg-[rgba(255,255,255,0.025)] p-4"
          >
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6f7d7f]">
              {label}
            </dt>
            <dd className="mt-2 text-sm text-[#c2cdce]">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="status-rail mt-8 flex flex-wrap items-center gap-2">
        {statusTrack.map((status, index) => (
          <StatusPill key={status} status={status} active={index <= 1} />
        ))}
      </div>
    </ProductSurface>
  );
}
