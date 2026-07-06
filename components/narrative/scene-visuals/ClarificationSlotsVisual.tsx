import { aiQuestions, contextSlots } from '@/content/narrative';
import { ProductSurface } from './ProductSurface';

export function ClarificationSlotsVisual() {
  return (
    <div className="grid items-center gap-5 lg:grid-cols-[0.72fr_1fr]">
      <ProductSurface className="p-5">
        <p className="font-mono text-xs text-[#78e4ee]">Requirement</p>
        <h3 className="mt-2 text-lg font-semibold text-[#e9f0f1]">
          PRD 生成与产物版本化
        </h3>
        <div className="mt-5 h-px bg-[linear-gradient(90deg,#14aec2,transparent)]" />
        <p className="mt-4 text-sm leading-7 text-[#8e9c9e]">
          AI clarification is anchored to the same requirement object.
        </p>
      </ProductSurface>
      <div className="relative">
        <div className="absolute left-[-34px] top-1/2 hidden h-px w-20 bg-[linear-gradient(90deg,transparent,#14aec2)] lg:block" />
        <div className="grid gap-3 sm:grid-cols-2">
          {contextSlots.map((slot, index) => (
            <ProductSurface key={slot.label} className="context-slot p-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6f7d7f]">
                {slot.label}
              </span>
              <p className="mt-2 text-sm text-[#c2cdce]">{slot.value}</p>
              <p className="mt-4 border-t border-[rgba(194,205,206,0.08)] pt-3 text-xs text-[#78e4ee]">
                {aiQuestions[index]}
              </p>
            </ProductSurface>
          ))}
        </div>
      </div>
    </div>
  );
}
