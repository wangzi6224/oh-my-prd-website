import { prdSections } from '@/content/narrative';
import { ProductSurface } from './ProductSurface';

const bodyLines = ['w-11/12', 'w-8/12', 'w-10/12', 'w-7/12', 'w-9/12', 'w-6/12'];

export function PrdBloomVisual() {
  return (
    <ProductSurface className="mx-auto max-w-2xl p-5">
      <div className="flex items-center justify-between gap-4 border-b border-[rgba(194,205,206,0.10)] pb-4">
        <div>
          <p className="font-mono text-xs text-[#78e4ee]">PRD Artifact</p>
          <h3 className="mt-1 text-lg font-semibold text-[#e9f0f1]">
            PRD 生成与产物版本化
          </h3>
        </div>
        <span className="rounded-full border border-[rgba(20,174,194,0.32)] bg-[rgba(20,174,194,0.12)] px-3 py-1 font-mono text-xs text-[#78e4ee]">
          Artifact v1
        </span>
      </div>
      <div className="grid gap-5 pt-5 sm:grid-cols-[0.42fr_1fr]">
        <nav className="space-y-2" aria-label="PRD 目录">
          {prdSections.slice(0, 7).map((section) => (
            <div
              key={section}
              className="prd-index rounded-[10px] border border-[rgba(194,205,206,0.09)] bg-[rgba(255,255,255,0.025)] px-3 py-2 text-sm text-[#a6b2b4]"
            >
              {section}
            </div>
          ))}
        </nav>
        <div className="space-y-3 rounded-[14px] border border-[rgba(194,205,206,0.10)] bg-[#091012]/46 p-4">
          {bodyLines.map((width, index) => (
            <span
              key={`${width}-${index}`}
              className={`prd-line block h-2.5 rounded-full bg-[rgba(194,205,206,0.14)] ${width}`}
            />
          ))}
          <span className="prd-line block h-2.5 w-5/12 rounded-full bg-[rgba(20,174,194,0.28)]" />
        </div>
      </div>
    </ProductSurface>
  );
}
