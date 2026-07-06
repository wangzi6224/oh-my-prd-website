import { SceneShell } from '@/components/narrative/SceneShell';
import { PrdBloomVisual } from '@/components/narrative/scene-visuals/PrdBloomVisual';
import { scenes } from '@/content/narrative';

const scene = scenes.find((item) => item.id === 'prd-generation')!;

export function PrdGenerationScene() {
  return (
    <SceneShell scene={scene}>
      <PrdBloomVisual />
    </SceneShell>
  );
}
