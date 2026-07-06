import { SceneShell } from '@/components/narrative/SceneShell';
import { KnowledgeCrystallizationVisual } from '@/components/narrative/scene-visuals/KnowledgeCrystallizationVisual';
import { scenes } from '@/content/narrative';

const scene = scenes.find((item) => item.id === 'knowledge-base')!;

export function KnowledgeBaseScene() {
  return (
    <SceneShell scene={scene}>
      <KnowledgeCrystallizationVisual />
    </SceneShell>
  );
}
