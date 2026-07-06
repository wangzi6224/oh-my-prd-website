import { knowledgeChunks } from '@/content/narrative';
import { ProductSurface } from './ProductSurface';

const chunkPositions = [
  'left-[5%] top-[16%]',
  'right-[4%] top-[20%]',
  'left-[12%] bottom-[12%]',
  'right-[10%] bottom-[14%]',
];

export function KnowledgeCrystallizationVisual() {
  return (
    <div className="relative min-h-[500px]">
      <ProductSurface className="absolute left-1/2 top-1/2 w-48 -translate-x-1/2 -translate-y-1/2 p-5 text-center">
        <p className="font-mono text-xs text-[#78e4ee]">Knowledge Core</p>
        <p className="mt-2 text-sm text-[#a6b2b4]">requirement_id</p>
      </ProductSurface>
      {knowledgeChunks.map((chunk, index) => (
        <ProductSurface
          key={chunk}
          className={`knowledge-node absolute ${chunkPositions[index]} w-48 p-4`}
        >
          <p className="text-sm font-medium text-[#e9f0f1]">{chunk}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {['project_id', 'version_id', 'section_path'].slice(0, 2 + (index % 2)).map((tag) => (
              <span key={tag} className="rounded-full border border-[rgba(194,205,206,0.10)] px-2 py-0.5 font-mono text-[10px] text-[#6f7d7f]">
                {tag}
              </span>
            ))}
          </div>
        </ProductSurface>
      ))}
      <ProductSurface className="absolute bottom-0 left-1/2 w-[min(420px,90%)] -translate-x-1/2 p-3">
        <span className="font-mono text-[11px] text-[#6f7d7f]">Search</span>
        <p className="mt-1 text-base text-[#e9f0f1]">审批规则</p>
      </ProductSurface>
    </div>
  );
}
