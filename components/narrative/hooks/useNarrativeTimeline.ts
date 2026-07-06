'use client';

import type { RefObject } from 'react';
import { useEffect } from 'react';
import { getGsap } from '@/lib/gsap';

export function useNarrativeTimeline({
  rootRef,
  enabled,
}: {
  rootRef: RefObject<HTMLElement | null>;
  enabled: boolean;
}) {
  useEffect(() => {
    if (!rootRef.current || !enabled) {
      return;
    }

    const root = rootRef.current;
    const { gsap, ScrollTrigger } = getGsap();

    const ctx = gsap.context(() => {
      gsap.set('.hero-logo', {
        autoAlpha: 0,
        y: 12,
        scale: 0.96,
      });
      gsap.set('.hero-title .hero-glyph', {
        yPercent: 104,
        rotateX: -42,
        autoAlpha: 0,
        transformOrigin: '50% 80%',
      });
      gsap.set('.hero-title-sheen', {
        autoAlpha: 0,
        scaleX: 0,
        xPercent: -70,
      });
      gsap.set('.hero-description, .hero-cta, .hero-scroll-cue', {
        autoAlpha: 0,
        y: 14,
      });
      gsap.set('.hero-data-node', {
        autoAlpha: 0,
        scale: 0.22,
      });
      gsap.set('.hero-signal-mesh, .hero-light-slice', {
        autoAlpha: 0,
      });

      const heroEntry = gsap.timeline({
        defaults: { ease: 'expo.out' },
        delay: 0.04,
      });

      heroEntry
        .to(
          '.hero-signal-mesh, .hero-light-slice',
          {
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power2.out',
          },
          0,
        )
        .to('.hero-logo', {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.72,
        }, 0.02)
        .to(
          '.hero-data-node',
          {
            autoAlpha: 0.72,
            scale: 1,
            stagger: {
              amount: 0.55,
              from: 'random',
            },
            duration: 0.84,
          },
          0.1,
        )
        .to(
          '.hero-title .hero-glyph',
          {
            yPercent: 0,
            rotateX: 0,
            autoAlpha: 1,
            stagger: {
              amount: 0.58,
              from: 'center',
            },
            duration: 0.92,
          },
          0.16,
        )
        .to(
          '.brand-sweep',
          {
            xPercent: 430,
            duration: 0.92,
            ease: 'power2.inOut',
          },
          0.22,
        )
        .to(
          '.hero-title-sheen',
          {
            autoAlpha: 0.82,
            scaleX: 1,
            xPercent: 78,
            duration: 0.9,
            ease: 'power2.inOut',
          },
          0.38,
        )
        .to(
          '.hero-description, .hero-cta, .hero-scroll-cue',
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.66,
          },
          0.68,
        )
        .to(
          '.hero-underwater-core',
          {
            scale: 0.68,
            yPercent: 34,
            autoAlpha: 0.9,
            duration: 0.9,
          },
          0.22,
        );

      const heroScroll = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.hero-scene',
          start: 'top top',
          end: '+=105%',
          scrub: 0.65,
          pin: true,
          pinSpacing: true,
        },
      });

      heroScroll
        .to(
          '.hero-content',
          {
            y: -86,
            scale: 0.9,
            autoAlpha: 0.3,
          },
          0.26,
        )
        .to(
          '.hero-underwater-core',
          {
            yPercent: 74,
            scale: 0.5,
            autoAlpha: 1,
          },
          0,
        )
        .to(
          '.hero-data-node',
          {
            y: -72,
            autoAlpha: 0.16,
            stagger: {
              amount: 0.18,
              from: 'center',
            },
          },
          0.08,
        )
        .to(
          '.hero-content',
          {
            y: -148,
            scale: 0.84,
            autoAlpha: 0,
          },
          0.72,
        );

      gsap.utils
        .toArray<HTMLElement>('.narrative-scene:not(.hero-scene)')
        .forEach((scene) => {
          const words = scene.querySelectorAll('.scene-copy .reveal-word');
          const label = scene.querySelector('.scene-copy > *:first-child');
          const paragraph = scene.querySelector('.scene-copy p');
          const visual = scene.querySelector('.scene-visual-inner');
          const visualItems = scene.querySelectorAll(
            [
              '.scene-card',
              '.fragment-trace',
              '.object-field',
              '.context-slot',
              '.prd-index',
              '.prd-line',
              '.diff-pane',
              '.review-issue',
              '.knowledge-node',
              '.source-card',
              '.impact-node',
              '.prototype-field',
              '.orbit-node',
            ].join(','),
          );

          gsap.set(words, {
            yPercent: 104,
            autoAlpha: 0,
          });
          gsap.set(label, { autoAlpha: 0, y: 14 });
          gsap.set(paragraph, { autoAlpha: 0, y: 22 });
          gsap.set(visual, { autoAlpha: 0, y: 72, scale: 1.08 });
          gsap.set(visualItems, { autoAlpha: 0, y: 34, scale: 0.98 });

          const tl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: {
              trigger: scene,
              start: 'top 86%',
              end: 'top 12%',
              scrub: 0.75,
            },
          });

          tl.to(
            visual,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1.05,
              ease: 'power2.out',
            },
            0,
          )
            .to(
              label,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.42,
              },
              0.1,
            )
            .to(
              words,
              {
                yPercent: 0,
                autoAlpha: 1,
                stagger: {
                  amount: 0.36,
                  from: 'start',
                },
                duration: 0.82,
              },
              0.18,
            )
            .to(
              paragraph,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.62,
              },
              0.36,
            )
            .to(
              visualItems,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                stagger: 0.035,
                duration: 0.72,
              },
              0.28,
            );
        });

      gsap.to('.flow-spine-fill', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      [
        '#prd-generation',
        '#knowledge-base',
        '#final-loop',
      ].forEach((selector) => {
        const node = root.querySelector(selector);
        if (!node) return;
        ScrollTrigger.create({
          trigger: node,
          start: 'top top',
          end: '+=52%',
          pin: true,
          pinSpacing: true,
          scrub: true,
        });
      });

      gsap.to('.orbit-ring', {
        rotate: 360,
        duration: 36,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50% 50%',
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, [enabled, rootRef]);
}
