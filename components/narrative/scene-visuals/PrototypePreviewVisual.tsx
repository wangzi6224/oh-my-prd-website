import { prototypeFields } from '@/content/narrative';
import { ProductSurface } from './ProductSurface';

export function PrototypePreviewVisual() {
  return (
    <ProductSurface className="mx-auto max-w-2xl p-5">
      <div className="mb-4 flex flex-wrap gap-2">
        {prototypeFields.map((field) => (
          <span
            key={field}
            className="prototype-field rounded-full border border-[rgba(194,205,206,0.12)] px-3 py-1 font-mono text-xs text-[#a6b2b4]"
          >
            {field}
          </span>
        ))}
      </div>
      <div className="overflow-hidden rounded-[16px] border border-[rgba(194,205,206,0.13)] bg-[#091012]/70">
        <div className="flex items-center gap-2 border-b border-[rgba(194,205,206,0.10)] px-4 py-3">
          <span className="size-2 rounded-full bg-[#f06a4d]" />
          <span className="size-2 rounded-full bg-[#e0a23a]" />
          <span className="size-2 rounded-full bg-[#3fcf8e]" />
          <span className="ml-auto rounded-full border border-[rgba(20,174,194,0.28)] px-2 py-0.5 font-mono text-[10px] text-[#78e4ee]">
            iframe sandbox
          </span>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-[0.35fr_1fr]">
          <div className="space-y-2">
            <span className="block h-8 rounded-[10px] bg-[rgba(20,174,194,0.20)]" />
            <span className="block h-8 rounded-[10px] bg-[rgba(255,255,255,0.06)]" />
            <span className="block h-8 rounded-[10px] bg-[rgba(255,255,255,0.05)]" />
          </div>
          <div className="rounded-[14px] border border-[rgba(194,205,206,0.10)] p-4">
            <h4 className="text-base font-semibold text-[#e9f0f1]">审批规则配置</h4>
            <div className="mt-4 space-y-3">
              <span className="block h-9 rounded-[10px] bg-[rgba(255,255,255,0.06)]" />
              <span className="block h-9 rounded-[10px] bg-[rgba(255,255,255,0.06)]" />
              <span className="block h-10 w-40 rounded-[10px] bg-[#14aec2]" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center font-mono text-xs text-[#78e4ee]">
        ArtifactVersion / Prototype v1
      </div>
    </ProductSurface>
  );
}
