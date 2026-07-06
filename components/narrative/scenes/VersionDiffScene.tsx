import { SceneShell } from '@/components/narrative/SceneShell';
import { DiffGateVisual } from '@/components/narrative/scene-visuals/DiffGateVisual';
import { scenes } from '@/content/narrative';

const scene = scenes.find((item) => item.id === 'version-diff')!;

export function VersionDiffScene() {
  return (
    <SceneShell scene={scene}>
      <DiffGateVisual />
    </SceneShell>
  );
}
