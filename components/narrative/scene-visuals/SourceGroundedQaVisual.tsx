import { sourceCards } from '@/content/narrative';
import { ProductSurface } from './ProductSurface';

export function SourceGroundedQaVisual() {
  return (
    <ProductSurface className="mx-auto max-w-2xl p-5">
      <div className="rounded-[14px] border border-[rgba(20,174,194,0.20)] bg-[rgba(20,174,194,0.08)] p-4">
        <span className="font-mono text-xs text-[#78e4ee]">Developer Question</span>
        <p className="mt-2 text-lg text-[#e9f0f1]">这个需求的验收标准是什么？</p>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_0.48fr]">
        <div className="rounded-[14px] border border-[rgba(194,205,206,0.10)] bg-[#091012]/45 p-4">
          <p className="text-sm leading-7 text-[#c2cdce]">
            验收需要覆盖 PRD 生成、版本历史、Diff 展示和 AI 评审入口；通过、驳回与异常路径都必须可测试。
          </p>
          <div className="mt-4 rounded-[12px] border border-[rgba(224,162,58,0.24)] bg-[rgba(224,162,58,0.08)] px-3 py-2 text-xs text-[#e0a23a]">
            不确定项：历史审批逻辑需结合代码影响分析确认
          </div>
        </div>
        <div className="space-y-2">
          {sourceCards.map((source) => (
            <div
              key={source}
              className="source-card rounded-[12px] border border-[rgba(194,205,206,0.10)] bg-[rgba(255,255,255,0.025)] px-3 py-2 text-xs text-[#a6b2b4]"
            >
              {source}
            </div>
          ))}
        </div>
      </div>
    </ProductSurface>
  );
}
