import { SceneShell } from '@/components/narrative/SceneShell';
import { SourceGroundedQaVisual } from '@/components/narrative/scene-visuals/SourceGroundedQaVisual';
import { scenes } from '@/content/narrative';

const scene = scenes.find((item) => item.id === 'developer-qa')!;

export function DeveloperQaScene() {
  return (
    <SceneShell scene={scene}>
      <SourceGroundedQaVisual />
    </SceneShell>
  );
}
