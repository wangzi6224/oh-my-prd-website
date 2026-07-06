import { reviewIssues } from '@/content/narrative';
import { ProductSurface } from './ProductSurface';

export function ReviewGateVisual() {
  return (
    <ProductSurface className="mx-auto max-w-2xl p-5">
      <div className="review-scan relative rounded-[14px] border border-[rgba(194,205,206,0.10)] bg-[#091012]/50 p-5">
        <div className="scan-line absolute inset-x-4 top-1/3 h-px bg-[#14aec2] shadow-[0_0_24px_rgba(20,174,194,0.8)]" />
        <p className="font-mono text-xs text-[#78e4ee]">Review Scan</p>
        <h3 className="mt-2 text-lg font-semibold text-[#e9f0f1]">
          Artifact v2 candidate
        </h3>
        <div className="mt-6 grid gap-3">
          {reviewIssues.map((issue) => (
            <div
              key={issue.level}
              className="review-issue flex items-center justify-between gap-4 rounded-[12px] border border-[rgba(194,205,206,0.10)] bg-[rgba(255,255,255,0.025)] px-3 py-2"
            >
              <span className="font-mono text-xs text-[#78e4ee]">{issue.level}</span>
              <span className="text-right text-sm text-[#a6b2b4]">{issue.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <span className="rounded-full border border-[rgba(194,205,206,0.12)] px-3 py-1 font-mono text-xs text-[#a6b2b4]">
          Human Approval
        </span>
        <span className="rounded-full border border-[rgba(20,174,194,0.38)] bg-[rgba(20,174,194,0.13)] px-3 py-1 font-mono text-xs text-[#78e4ee]">
          Published
        </span>
      </div>
    </ProductSurface>
  );
}
