import { SceneShell } from '@/components/narrative/SceneShell';
import { SubmergedConvergenceVisual } from '@/components/narrative/scene-visuals/SubmergedConvergenceVisual';
import { scenes } from '@/content/narrative';

const scene = scenes.find((item) => item.id === 'pain')!;

export function PainBreakScene() {
  return (
    <SceneShell scene={scene} className="scene-overlap scene-convergence">
      <SubmergedConvergenceVisual />
    </SceneShell>
  );
}
