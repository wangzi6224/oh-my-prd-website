import { SceneShell } from '@/components/narrative/SceneShell';
import { ClarificationSlotsVisual } from '@/components/narrative/scene-visuals/ClarificationSlotsVisual';
import { scenes } from '@/content/narrative';

const scene = scenes.find((item) => item.id === 'conversation')!;

export function ConversationScene() {
  return (
    <SceneShell scene={scene}>
      <ClarificationSlotsVisual />
    </SceneShell>
  );
}
