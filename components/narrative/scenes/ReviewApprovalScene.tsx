import { SceneShell } from '@/components/narrative/SceneShell';
import { ReviewGateVisual } from '@/components/narrative/scene-visuals/ReviewGateVisual';
import { scenes } from '@/content/narrative';

const scene = scenes.find((item) => item.id === 'review-approval')!;

export function ReviewApprovalScene() {
  return (
    <SceneShell scene={scene}>
      <ReviewGateVisual />
    </SceneShell>
  );
}
