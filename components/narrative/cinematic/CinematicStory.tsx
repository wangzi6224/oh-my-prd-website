'use client';

import type { CSSProperties } from 'react';
import { startTransition, useCallback, useEffect, useRef, useState } from 'react';
import { BrandMark } from '@/components/narrative/effects/BrandMark';
import { GlowButton } from '@/components/ui/GlowButton';
import { cinematicScenes } from '@/content/cinematicNarrative';
import { CinematicCopy, CinematicSceneNav } from './CinematicCopy';
import { HeroLogoReveal } from './HeroLogoReveal';
import { MorphWorkbench } from './MorphWorkbench';
import { PixelFieldBackground } from './PixelFieldBackground';

const githubUrl = 'https://github.com/wangzi6224/oh-my-prd';
const heroReleaseThreshold = 0.42;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function CinematicStory() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const heroActiveRef = useRef(true);
  const activeIndexRef = useRef(0);
  const tickingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHeroActive, setIsHeroActive] = useState(true);
  const activeScene = cinematicScenes[activeIndex];

  const update = useCallback(() => {
    tickingRef.current = false;
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const maxScroll = Math.max(track.offsetHeight - window.innerHeight, 1);
    const y = clamp(window.scrollY - track.offsetTop, 0, maxScroll);
    const progress = y / maxScroll;
    const raw = progress * cinematicScenes.length;
    const nextIndex = clamp(Math.floor(raw), 0, cinematicScenes.length - 1);
    const localProgress = raw - nextIndex;
    const heroScatter = clamp(raw, 0, 1);

    root.style.setProperty('--story-progress', progress.toFixed(4));
    root.style.setProperty('--scene-progress', localProgress.toFixed(4));
    root.style.setProperty('--hero-scatter', heroScatter.toFixed(4));

    const nextHeroActive = heroScatter < heroReleaseThreshold;
    if (nextHeroActive !== heroActiveRef.current) {
      heroActiveRef.current = nextHeroActive;
      setIsHeroActive(nextHeroActive);
    }

    if (nextIndex !== activeIndexRef.current) {
      activeIndexRef.current = nextIndex;
      startTransition(() => {
        setActiveIndex(nextIndex);
      });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const selectScene = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = Math.max(track.offsetHeight - window.innerHeight, 1);
    const target = track.offsetTop + maxScroll * (index / (cinematicScenes.length - 1));
    window.scrollTo({ top: target, behavior: 'smooth' });
  }, []);

  return (
    <main
      ref={rootRef}
      className="cinematic-story"
      data-scene={activeIndex}
      data-tone={activeScene.tone}
      data-hero={isHeroActive ? 'active' : 'released'}
      style={{ '--scene-count': cinematicScenes.length } as CSSProperties}
    >
      <PixelFieldBackground />
      <div className="cinematic-progress" aria-hidden="true" />

      <header className="cinematic-topbar">
        <BrandMark size="md" />
        <nav aria-label="页面导航">
          <a href="#cinematic-story">叙事</a>
          <a href="#cinematic-final">闭环</a>
          <a href={githubUrl}>开源仓库</a>
        </nav>
      </header>

      <CinematicSceneNav activeIndex={activeIndex} onSelect={selectScene} />

      <div ref={trackRef} id="cinematic-story" className="cinematic-story__track">
        <section className="cinematic-stage" aria-label="Oh My PRD cinematic narrative">
          <div className="cinematic-current cinematic-current--a" aria-hidden="true" />
          <div className="cinematic-current cinematic-current--b" aria-hidden="true" />
          <HeroLogoReveal />
          <div className="cinematic-stage__grid">
            <CinematicCopy scene={activeScene} />
            <div className="cinematic-visual-stage">
              <MorphWorkbench scene={activeScene} />
            </div>
          </div>
          <div className="cinematic-phase-rail" aria-hidden="true">
            <div />
            <span>痛点</span>
            <span>探针</span>
            <span>关联</span>
            <span>图谱</span>
            <span>闭环</span>
          </div>
        </section>
      </div>

      <section id="cinematic-final" className="cinematic-final">
        <div>
          <p>Oh My PRD</p>
          <h2>需求探针、需求关联、需求上下文图谱，最终收束成需求闭环。</h2>
          <div>
            <GlowButton href={githubUrl} variant="primary">
              查看 GitHub
            </GlowButton>
            <GlowButton href="#cinematic-story" variant="secondary">
              重新观看
            </GlowButton>
          </div>
        </div>
      </section>
    </main>
  );
}
