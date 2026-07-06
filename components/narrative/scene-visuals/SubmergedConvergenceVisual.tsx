import { fragments, requirementDemo } from '@/content/narrative';
import { CoreOrb } from './CoreOrb';

const positions = [
  'left-[6%] top-[16%]',
  'right-[12%] top-[18%]',
  'left-[14%] bottom-[18%]',
  'right-[8%] bottom-[22%]',
  'left-1/2 top-[8%] -translate-x-1/2',
];

export function SubmergedConvergenceVisual() {
  return (
    <div className="convergence-field relative min-h-[720px] overflow-hidden">
      <div className="convergence-liquid absolute inset-[-12%]" />
      <div className="convergence-vignette absolute inset-0" />
      <div className="absolute inset-0 convergence-ring" />
      <div className="absolute inset-0 flex items-center justify-center">
        <CoreOrb label="Requirement Core" sublabel={requirementDemo.title} />
      </div>
      {fragments.map((fragment, index) => {
        const Icon = fragment.icon;
        return (
          <div
            key={fragment.label}
            className={`fragment-trace absolute ${positions[index]} flex items-center gap-2 rounded-full border border-[rgba(194,205,206,0.12)] bg-[#0d1416]/36 px-3 py-2 text-xs text-[#a6b2b4] backdrop-blur-md`}
          >
            <Icon aria-hidden="true" className="size-3.5 text-[#78e4ee]" />
            <span>{fragment.label}</span>
          </div>
        );
      })}
    </div>
  );
}
