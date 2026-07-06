import clsx from 'clsx';
import type { ReactNode } from 'react';
import type { NarrativeScene } from '@/content/narrative';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextReveal } from '@/components/narrative/effects/TextReveal';

type SceneShellProps = {
  scene: NarrativeScene;
  children?: ReactNode;
  className?: string;
};

export function SceneShell({ scene, children, className }: SceneShellProps) {
  return (
    <section
      id={scene.id}
      data-scene={scene.id}
      data-phase={scene.phase}
      className={clsx(
        'narrative-scene cinematic-scene relative min-h-[112svh] w-full overflow-hidden px-5 py-20 sm:px-8 lg:py-24',
        className,
      )}
      aria-labelledby={`${scene.id}-title`}
    >
      <div className="scene-stage relative mx-auto flex min-h-[92svh] w-full max-w-7xl items-center justify-center">
        <div className="scene-visual pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <div className="scene-visual-inner pointer-events-auto w-full max-w-5xl">
            {children}
          </div>
        </div>
        <div className="scene-copy relative z-10 w-full max-w-[680px]">
          <SectionLabel index={scene.index} label={scene.nav} icon={scene.icon} />
          <TextReveal
            as="h2"
            id={`${scene.id}-title`}
            text={scene.title}
            className="mt-5 block text-balance text-[clamp(2.55rem,5.4vw,5.8rem)] font-semibold leading-[1.02] text-[#e9f0f1]"
          />
          <p className="mt-5 max-w-lg text-pretty text-base leading-8 text-[#a6b2b4] sm:text-lg">
            {scene.description}
          </p>
        </div>
      </div>
    </section>
  );
}
