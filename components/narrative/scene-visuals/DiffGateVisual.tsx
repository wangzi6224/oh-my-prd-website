import { ProductSurface } from './ProductSurface';

export function DiffGateVisual() {
  return (
    <ProductSurface className="mx-auto max-w-2xl p-5">
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-xs text-[#78e4ee]">Versioned Diff Gate</span>
        <span className="font-mono text-xs text-[#6f7d7f]">
          v1 {'->'} candidate {'->'} v2
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="diff-pane rounded-[14px] border border-[rgba(240,106,77,0.20)] bg-[rgba(240,106,77,0.07)] p-4">
          <span className="font-mono text-xs text-[#ff9a84]">Artifact v1</span>
          <p className="mt-4 text-sm text-[#c2cdce]">验收标准：完成审批流程。</p>
          <div className="mt-4 h-2 w-8/12 rounded-full bg-[rgba(240,106,77,0.22)]" />
        </div>
        <div className="diff-gate mx-auto hidden h-full w-px bg-[linear-gradient(180deg,transparent,#14aec2,transparent)] shadow-[0_0_20px_rgba(20,174,194,0.62)] sm:block" />
        <div className="diff-pane rounded-[14px] border border-[rgba(63,207,142,0.22)] bg-[rgba(63,207,142,0.07)] p-4">
          <span className="font-mono text-xs text-[#79e6ae]">Proposed Change</span>
          <p className="mt-4 text-sm text-[#c2cdce]">
            验收标准：覆盖通过、驳回、超时三类路径。
          </p>
          <div className="mt-4 h-2 w-10/12 rounded-full bg-[rgba(63,207,142,0.22)]" />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-2 text-xs">
        {['v1', 'candidate', 'accepted', 'v2'].map((state, index) => (
          <span
            key={state}
            className={`rounded-full border px-3 py-1 font-mono ${
              index >= 1
                ? 'border-[rgba(20,174,194,0.34)] bg-[rgba(20,174,194,0.12)] text-[#78e4ee]'
                : 'border-[rgba(194,205,206,0.12)] text-[#6f7d7f]'
            }`}
          >
            {state}
          </span>
        ))}
      </div>
    </ProductSurface>
  );
}
