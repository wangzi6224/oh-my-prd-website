'use client';

import dynamic from 'next/dynamic';
import { Github } from 'lucide-react';
import { BrandMark } from '@/components/narrative/effects/BrandMark';
import { GlowButton } from '@/components/ui/GlowButton';
import { useCinematicScroll } from '@/lib/scroll/useCinematicScroll';
import { ACT_COUNT, cinematicScenes } from '@/content/cinematicNarrative';
import { ActGraphic } from '@/components/narrative/acts/graphics/ActGraphics';
import { CinematicCopy, CinematicSceneNav } from './CinematicCopy';
import { HeroLogoReveal } from './HeroLogoReveal';

// WebGL 画布只在客户端加载(touches window / three)
const RequirementCanvas = dynamic(
  () => import('@/components/webgl/RequirementCanvas').then((m) => m.RequirementCanvas),
  { ssr: false },
);

const githubUrl = 'https://github.com/wangzi6224/oh-my-prd';

const phaseRail = ['痛点', '探针', '成文', '图谱', '关联', '闭环'];

export function CinematicStory() {
  const { trackRef, progressRef, sceneRef, activeAct, scrollToAct } =
    useCinematicScroll(ACT_COUNT);
  const activeScene = cinematicScenes[activeAct];

  return (
    <main className="cinematic" data-tone={activeScene.tone} data-act={activeAct}>
      <div className="cinematic-techbg" aria-hidden="true" />
      <RequirementCanvas progressRef={progressRef} sceneRef={sceneRef} />
      <div className="cinematic-scrim" aria-hidden="true" />

      <div className="cinematic-progress" aria-hidden="true">
        <span className="cinematic-progress__bar" />
      </div>

      <header className="cinematic-topbar">
        <BrandMark size="md" />
        <nav aria-label="页面导航">
          <a
            className="cinematic-topbar__gh"
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="开源仓库 GitHub"
          >
            <Github size={20} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <CinematicSceneNav activeIndex={activeAct} onSelect={scrollToAct} />

      <section ref={trackRef} id="cinematic-story" className="cinematic-track">
        <div className="cinematic-stage" aria-label="Oh My PRD 需求闭环叙事">
          <HeroLogoReveal />

          {/* 全部 12 幕都渲染进 DOM(SEO / 可访问性 / 无 JS 降级);
              呈现度由滚动连续驱动(--rev/--sp,写在各 .cinematic-act 上)*/}
          <div className="cinematic-acts">
            {cinematicScenes.map((scene, i) => (
              <article
                key={scene.id}
                className="cinematic-act"
                data-motion={scene.motion}
                aria-hidden={i === activeAct ? undefined : 'true'}
                style={
                  {
                    // 初始全 0:进场时只显示 Hero,不与首屏内容重叠;JS 挂载后由滚动接管
                    '--rev': 0,
                    '--sp': 0,
                  } as React.CSSProperties
                }
              >
                <div className="cinematic-grid">
                  <CinematicCopy scene={scene} isHero={i === 0} />
                  <div className="cinematic-visual-stage">
                    <ActGraphic id={scene.id} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="cinematic-phase-rail" aria-hidden="true">
            <span className="cinematic-phase-rail__fill" />
            {phaseRail.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="cinematic-final" className="cinematic-final">
        <div className="cinematic-final__inner">
          <BrandMark size="lg" showName={false} />
          <p className="cinematic-final__brand">Oh My PRD</p>
          <h2 className="cinematic-final__headline">
            需求探针 · 需求关联 · 需求上下文图谱,
            <br />
            最终收束成一条可追踪的需求闭环。
          </h2>
          <p className="cinematic-final__sub">
            把需求当资产来管理 —— 让零散的产品讨论,变成结构化、可追溯、可评审的需求资产。
          </p>
          <div className="cinematic-final__cta">
            <GlowButton href={githubUrl} variant="primary" target="_blank" rel="noreferrer">
              查看 GitHub
            </GlowButton>
            <GlowButton href="#cinematic-story" variant="secondary">
              重新观看
            </GlowButton>
          </div>
          <p className="cinematic-final__meta">开源 · AGPL-3.0 · AI 需求工作台</p>
        </div>
      </section>
    </main>
  );
}
