import { SceneShell } from '@/components/narrative/SceneShell';
import { ImpactMapVisual } from '@/components/narrative/scene-visuals/ImpactMapVisual';
import { scenes } from '@/content/narrative';

const scene = scenes.find((item) => item.id === 'impact-analysis')!;

export function ImpactAnalysisScene() {
  return (
    <SceneShell scene={scene}>
      <ImpactMapVisual />
    </SceneShell>
  );
}
