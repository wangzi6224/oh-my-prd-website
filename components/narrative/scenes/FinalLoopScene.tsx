import { SceneShell } from '@/components/narrative/SceneShell';
import { LifecycleOrbitVisual } from '@/components/narrative/scene-visuals/LifecycleOrbitVisual';
import { GlowButton } from '@/components/ui/GlowButton';
import { scenes } from '@/content/narrative';

const scene = scenes.find((item) => item.id === 'final-loop')!;

export function FinalLoopScene() {
  return (
    <SceneShell scene={scene}>
      <LifecycleOrbitVisual />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <GlowButton href="https://github.com/" variant="primary">
          GitHub
        </GlowButton>
        <GlowButton href="#hero">本地部署</GlowButton>
        <GlowButton href="#conversation">查看演示流程</GlowButton>
      </div>
    </SceneShell>
  );
}
