import { SceneShell } from '@/components/narrative/SceneShell';
import { RequirementObjectVisual } from '@/components/narrative/scene-visuals/RequirementObjectVisual';
import { scenes } from '@/content/narrative';

const scene = scenes.find((item) => item.id === 'requirement-core')!;

export function RequirementCoreScene() {
  return (
    <SceneShell scene={scene}>
      <RequirementObjectVisual />
    </SceneShell>
  );
}
