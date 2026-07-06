'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { FloatingNav } from '@/components/narrative/FloatingNav';
import { useNarrativeTimeline } from '@/components/narrative/hooks/useNarrativeTimeline';
import { ScrollProgress } from '@/components/narrative/ScrollProgress';
import { ConversationScene } from '@/components/narrative/scenes/ConversationScene';
import { DeveloperQaScene } from '@/components/narrative/scenes/DeveloperQaScene';
import { FinalLoopScene } from '@/components/narrative/scenes/FinalLoopScene';
import { HeroChaosScene } from '@/components/narrative/scenes/HeroChaosScene';
import { ImpactAnalysisScene } from '@/components/narrative/scenes/ImpactAnalysisScene';
import { KnowledgeBaseScene } from '@/components/narrative/scenes/KnowledgeBaseScene';
import { PainBreakScene } from '@/components/narrative/scenes/PainBreakScene';
import { PrdGenerationScene } from '@/components/narrative/scenes/PrdGenerationScene';
import { PrototypeScene } from '@/components/narrative/scenes/PrototypeScene';
import { RequirementCoreScene } from '@/components/narrative/scenes/RequirementCoreScene';
import { ReviewApprovalScene } from '@/components/narrative/scenes/ReviewApprovalScene';
import { VersionDiffScene } from '@/components/narrative/scenes/VersionDiffScene';
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

const PixiStage = dynamic(
  () => import('@/components/pixi/PixiStage').then((mod) => mod.PixiStage),
  { ssr: false },
);

export function MarketingPage() {
  const rootRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const enableMotion = !isMobile && !reducedMotion;

  useNarrativeTimeline({ rootRef, enabled: enableMotion });

  return (
    <main ref={rootRef} className="narrative-root min-h-screen overflow-x-clip">
      <ScrollProgress />
      <FloatingNav enabled={!isMobile} />
      {enableMotion ? <PixiStage mode="flow" className="fixed inset-0 z-0" /> : null}

      <div className="flow-spine pointer-events-none fixed left-1/2 top-0 z-[1] hidden h-screen -translate-x-1/2 lg:block">
        <div className="h-full w-px bg-[rgba(194,205,206,0.08)]" />
        <div className="flow-spine-fill absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-[#14aec2] shadow-[0_0_18px_rgba(20,174,194,0.74)]" />
      </div>

      <div className="relative z-10">
        <HeroChaosScene />
        <PainBreakScene />
        <RequirementCoreScene />
        <ConversationScene />
        <PrdGenerationScene />
        <VersionDiffScene />
        <ReviewApprovalScene />
        <KnowledgeBaseScene />
        <DeveloperQaScene />
        <ImpactAnalysisScene />
        <PrototypeScene />
        <FinalLoopScene />
      </div>
    </main>
  );
}
