import { impactReport } from '@/content/narrative';
import { ProductSurface } from './ProductSurface';

export function ImpactMapVisual() {
  return (
    <div className="grid items-center gap-4 lg:grid-cols-[0.72fr_0.42fr_1fr]">
      <ProductSurface className="p-4">
        <p className="font-mono text-xs text-[#78e4ee]">Requirement</p>
        <p className="mt-2 text-sm leading-7 text-[#c2cdce]">
          历史审批逻辑需结合代码影响分析确认
        </p>
      </ProductSurface>
      <ProductSurface className="impact-agent p-4 text-center">
        <p className="font-mono text-xs text-[#78e4ee]">ImpactAnalysisAgent</p>
        <div className="mx-auto mt-4 size-16 rounded-full border border-[rgba(20,174,194,0.36)] bg-[rgba(20,174,194,0.10)] shadow-glow" />
      </ProductSurface>
      <ProductSurface className="p-4">
        <div className="flex flex-wrap gap-2">
          {['risk: medium', 'complexity: medium', 'read-only'].map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-[rgba(20,174,194,0.28)] bg-[rgba(20,174,194,0.10)] px-2.5 py-1 font-mono text-[11px] text-[#78e4ee]"
            >
              {pill}
            </span>
          ))}
        </div>
        <div className="mt-5 grid gap-2">
          {impactReport.modules.map((module, index) => (
            <div key={module} className="impact-node rounded-[12px] border border-[rgba(194,205,206,0.10)] p-3">
              <p className="font-mono text-xs text-[#e9f0f1]">{module}</p>
              <p className="mt-1 truncate font-mono text-[11px] text-[#6f7d7f]">
                {impactReport.files[index]}
              </p>
            </div>
          ))}
        </div>
      </ProductSurface>
    </div>
  );
}
