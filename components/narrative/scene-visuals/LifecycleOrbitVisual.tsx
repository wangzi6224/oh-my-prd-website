import { finalLoop } from '@/content/narrative';
import { BrandMark } from '@/components/narrative/effects/BrandMark';

export function LifecycleOrbitVisual() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[620px] items-center justify-center">
      <div className="orbit-ring absolute inset-[10%] rounded-full border border-[rgba(20,174,194,0.28)] shadow-[0_0_80px_-48px_rgba(20,174,194,1)]" />
      <div className="orbit-ring absolute inset-[22%] rounded-full border border-[rgba(194,205,206,0.08)]" />
      <div className="relative z-10 rounded-full border border-[rgba(20,174,194,0.28)] bg-[#0d1416]/86 px-9 py-7 text-center shadow-glow backdrop-blur-xl">
        <BrandMark size="md" />
        <p className="mt-4 max-w-56 text-sm text-[#a6b2b4]">
          把需求的一生，变成可追踪的系统。
        </p>
      </div>
      {finalLoop.map((item, index) => {
        const angle = (index / finalLoop.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 44;
        const left = (50 + Math.cos(angle) * radius).toFixed(4);
        const top = (50 + Math.sin(angle) * radius).toFixed(4);
        return (
          <span
            key={item}
            className="orbit-node absolute rounded-full border border-[rgba(194,205,206,0.13)] bg-[#131e20]/90 px-2.5 py-1 font-mono text-[10px] text-[#a6b2b4] backdrop-blur-md"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}
