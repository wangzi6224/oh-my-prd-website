'use client';

import { useEffect, useRef } from 'react';

type CanvasState = {
  context: CanvasRenderingContext2D;
  imageData: ImageData;
  columns: number;
  rows: number;
};

type Palette = {
  accent: [number, number, number];
  strong: [number, number, number];
};

type PointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  active: boolean;
  lastRippleAt: number;
  lastRippleX: number;
  lastRippleY: number;
};

type Ripple = {
  x: number;
  y: number;
  birth: number;
  force: number;
};

const MAX_RIPPLES = 5;
const RIPPLE_LIFE = 2.35;
const DEFAULT_ACCENT: [number, number, number] = [20, 174, 194];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function hash2(x: number, y: number) {
  return Math.sin(x * 127.1 + y * 311.7) * 43758.5453123 % 1;
}

function parseRgb(value: string) {
  const numbers = value.match(/\d+(\.\d+)?/g);
  if (!numbers || numbers.length < 3) return DEFAULT_ACCENT;

  return [
    clamp(Number(numbers[0]), 0, 255),
    clamp(Number(numbers[1]), 0, 255),
    clamp(Number(numbers[2]), 0, 255),
  ] as [number, number, number];
}

function getPalette(canvas: HTMLCanvasElement): Palette {
  const accent = parseRgb(getComputedStyle(canvas).getPropertyValue('--accent-rgb'));
  const strong = accent.map((channel) => Math.round(channel + (255 - channel) * 0.48)) as [
    number,
    number,
    number,
  ];

  return { accent, strong };
}

function createCanvasState(canvas: HTMLCanvasElement): CanvasState | null {
  const context = canvas.getContext('2d', { alpha: true });
  if (!context) return null;

  const width = Math.max(window.innerWidth, 1);
  const height = Math.max(window.innerHeight, 1);
  const minCellSize = width < 768 ? 12 : 9;
  const cappedCellSize = Math.max(minCellSize, Math.ceil(Math.max(width / 260, height / 150)));
  const columns = Math.max(1, Math.ceil(width / cappedCellSize));
  const rows = Math.max(1, Math.ceil(height / cappedCellSize));

  canvas.width = columns;
  canvas.height = rows;
  context.imageSmoothingEnabled = false;

  return {
    context,
    imageData: context.createImageData(columns, rows),
    columns,
    rows,
  };
}

function pruneRipples(ripples: Ripple[], time: number) {
  let nextIndex = 0;
  for (let index = 0; index < ripples.length; index++) {
    const ripple = ripples[index];
    if (!ripple || time - ripple.birth > RIPPLE_LIFE) continue;
    ripples[nextIndex] = ripple;
    nextIndex++;
  }
  ripples.length = nextIndex;
}

function drawPixelField(
  state: CanvasState,
  palette: Palette,
  pointer: PointerState,
  ripples: Ripple[],
  time: number,
) {
  const { context, imageData, columns, rows } = state;
  const data = imageData.data;
  const accentR = palette.accent[0];
  const accentG = palette.accent[1];
  const accentB = palette.accent[2];
  const strongR = palette.strong[0];
  const strongG = palette.strong[1];
  const strongB = palette.strong[2];
  const columnsMinusOne = Math.max(columns - 1, 1);
  const rowsMinusOne = Math.max(rows - 1, 1);
  const aspect = columns / rows;

  pointer.x += (pointer.targetX - pointer.x) * 0.075;
  pointer.y += (pointer.targetY - pointer.y) * 0.075;
  pruneRipples(ripples, time);

  let offset = 0;
  for (let y = 0; y < rows; y++) {
    const yn = (y / rowsMinusOne - 0.5) * 2;
    const yFlow = Math.sin(y * 0.095 - time * 0.42);

    for (let x = 0; x < columns; x++) {
      const xn = (x / columnsMinusOne - 0.5) * 2;
      const ax = xn * aspect;
      const radius = Math.sqrt(ax * ax + yn * yn);
      const angle = Math.atan2(yn, ax);
      const grain = Math.abs(hash2(x, y));
      const directionalFlow =
        Math.sin(x * 0.075 + yFlow + time * 0.62) * 0.18 +
        Math.cos(y * 0.08 + xn * 1.4 - time * 0.5) * 0.13;
      const orbitalFlow = Math.sin(angle * 2.4 + radius * 7.1 - time * 0.58) * 0.14;
      const vein = Math.sin((xn * 2.2 - yn * 1.35) + time * 0.34) * 0.09;
      const edgeFade = 1 - smoothstep(0.84, 1.34, radius);

      let pointerWake = 0;
      if (pointer.active) {
        const pointerDx = ax - pointer.x * aspect;
        const pointerDy = yn - pointer.y;
        const pointerDistance = Math.sqrt(pointerDx * pointerDx + pointerDy * pointerDy);
        pointerWake =
          Math.exp(-pointerDistance * pointerDistance * 8.5) *
          (0.09 + Math.sin(pointerDistance * 17 - time * 3.1) * 0.05);
      }

      let rippleEnergy = 0;
      for (let index = 0; index < ripples.length; index++) {
        const ripple = ripples[index];
        if (!ripple) continue;

        const age = time - ripple.birth;
        const rippleDx = ax - ripple.x * aspect;
        const rippleDy = yn - ripple.y;
        const rippleDistance = Math.sqrt(rippleDx * rippleDx + rippleDy * rippleDy);
        const ringDistance = Math.abs(rippleDistance - age * 0.34);
        const ring = 1 - smoothstep(0.012, 0.095, ringDistance);
        rippleEnergy += ring * ring * (1 - age / RIPPLE_LIFE) * ripple.force * 0.34;
      }

      const field =
        0.5 +
        directionalFlow +
        orbitalFlow +
        vein +
        pointerWake +
        rippleEnergy -
        radius * 0.13;
      const threshold = 0.5 + grain * 0.18;
      const alive = field > threshold;
      const heat = clamp((field - 0.32) * 1.42 + rippleEnergy * 1.6 + pointerWake * 1.2, 0, 1);
      const baseAlpha = alive ? 34 + (field - threshold) * 170 : 4 + Math.max(directionalFlow, 0) * 24;
      const alpha = clamp(baseAlpha * edgeFade, 0, 178);
      const colorMix = clamp(heat * 0.74 + rippleEnergy * 1.2, 0, 1);

      data[offset] = Math.round(accentR + (strongR - accentR) * colorMix);
      data[offset + 1] = Math.round(accentG + (strongG - accentG) * colorMix);
      data[offset + 2] = Math.round(accentB + (strongB - accentB) * colorMix);
      data[offset + 3] = Math.round(alpha);
      offset += 4;
    }
  }

  context.putImageData(imageData, 0, 0);
}

export function PixelFieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let state = createCanvasState(canvas);
    if (!state) return undefined;

    const pointer: PointerState = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
      lastRippleAt: 0,
      lastRippleX: 0,
      lastRippleY: 0,
    };
    const ripples: Ripple[] = [];
    let palette = getPalette(canvas);
    let animationFrame = 0;
    let lastFrame = 0;
    let lastPaletteSync = 0;
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderOnce = (time: number) => {
      if (!state) return;
      if (time - lastPaletteSync > 0.35) {
        palette = getPalette(canvas);
        lastPaletteSync = time;
      }
      drawPixelField(state, palette, pointer, ripples, time);
    };

    const stop = () => {
      if (!animationFrame) return;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const loop = (now: number) => {
      if (reducedMotion || document.hidden) {
        stop();
        return;
      }

      const frameInterval = window.innerWidth < 768 ? 1000 / 22 : 1000 / 28;
      if (now - lastFrame >= frameInterval) {
        lastFrame = now;
        renderOnce(now * 0.001);
      }

      animationFrame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (reducedMotion || document.hidden || animationFrame) return;
      animationFrame = window.requestAnimationFrame(loop);
    };

    const resize = () => {
      state = createCanvasState(canvas);
      renderOnce(performance.now() * 0.001);
    };

    const addRipple = (clientX: number, clientY: number, force: number) => {
      const x = (clientX / Math.max(window.innerWidth, 1) - 0.5) * 2;
      const y = (clientY / Math.max(window.innerHeight, 1) - 0.5) * 2;
      const now = performance.now() * 0.001;
      const moved = Math.hypot(x - pointer.lastRippleX, y - pointer.lastRippleY);

      pointer.targetX = x;
      pointer.targetY = y;
      pointer.active = true;

      if (now - pointer.lastRippleAt < 0.08 || moved < 0.026) return;

      ripples.push({ x, y, birth: now, force });
      if (ripples.length > MAX_RIPPLES) ripples.shift();

      pointer.lastRippleAt = now;
      pointer.lastRippleX = x;
      pointer.lastRippleY = y;
    };

    const onPointerMove = (event: PointerEvent) => {
      addRipple(event.clientX, event.clientY, 0.52);
    };

    const onPointerDown = (event: PointerEvent) => {
      addRipple(event.clientX, event.clientY, 1);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionPreferenceChange = () => {
      reducedMotion = motionQuery.matches;
      if (reducedMotion) {
        stop();
        renderOnce(performance.now() * 0.001);
      } else {
        start();
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    motionQuery.addEventListener('change', onMotionPreferenceChange);

    renderOnce(0.42);
    start();

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      motionQuery.removeEventListener('change', onMotionPreferenceChange);
    };
  }, []);

  return (
    <div className="cinematic-fixed-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="cinematic-fixed-bg__canvas" />
      <div className="cinematic-fixed-bg__depth" />
    </div>
  );
}
