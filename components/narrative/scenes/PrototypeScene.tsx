import { SceneShell } from '@/components/narrative/SceneShell';
import { PrototypePreviewVisual } from '@/components/narrative/scene-visuals/PrototypePreviewVisual';
import { scenes } from '@/content/narrative';

const scene = scenes.find((item) => item.id === 'prototype')!;

export function PrototypeScene() {
  return (
    <SceneShell scene={scene}>
      <PrototypePreviewVisual />
    </SceneShell>
  );
}
