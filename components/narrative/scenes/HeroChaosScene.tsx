import { ArrowDown } from 'lucide-react';
import { BrandMark } from '@/components/narrative/effects/BrandMark';
import { HeroTitleReveal } from '@/components/narrative/effects/HeroTitleReveal';
import { HeroFluidVisual } from '@/components/narrative/scene-visuals/HeroFluidVisual';
import { GlowButton } from '@/components/ui/GlowButton';
import { ctas, scenes } from '@/content/narrative';

const scene = scenes.find((item) => item.id === 'hero')!;

export function HeroChaosScene() {
  return (
    <section
      id={scene.id}
      data-scene={scene.id}
      data-phase={scene.phase}
      className="narrative-scene hero-scene relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-24"
      aria-labelledby="hero-title"
    >
      <HeroFluidVisual />
      <div className="scene-copy hero-content relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <BrandMark size="lg" className="hero-logo mb-10" />
        <HeroTitleReveal
          id="hero-title"
          lines={['别再让需求死在', '文档里。']}
          className="text-balance text-[clamp(3.35rem,7vw,6.8rem)] font-semibold leading-[0.98] text-[#e9f0f1]"
        />
        <p className="hero-description mt-7 max-w-2xl text-pretty text-base leading-8 text-[#a6b2b4] sm:text-lg">
          {scene.description}
        </p>
        <div className="hero-cta mt-9 flex flex-wrap justify-center gap-3">
          {ctas.slice(0, 2).map((cta, index) => (
            <GlowButton
              key={cta.label}
              href={cta.href}
              variant={index === 0 ? 'primary' : 'secondary'}
            >
              {cta.label}
            </GlowButton>
          ))}
        </div>
        <a
          href="#pain"
          className="hero-scroll-cue mt-8 inline-flex size-11 items-center justify-center rounded-full border border-[rgba(120,228,238,0.18)] bg-[rgba(8,16,18,0.36)] text-[#78e4ee]/80 outline-none backdrop-blur-md transition hover:border-[rgba(120,228,238,0.42)] hover:text-[#e9f0f1] focus-visible:ring-2 focus-visible:ring-[#14aec2]"
          aria-label="进入叙事流程"
        >
          <ArrowDown size={18} strokeWidth={1.8} />
        </a>
      </div>
    </section>
  );
}
