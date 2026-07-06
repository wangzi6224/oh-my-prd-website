import { Application, Graphics } from 'pixi.js';

type FlowMode = 'flow' | 'final';

export async function createFlowLines(
  host: HTMLElement,
  options: { mode: FlowMode },
) {
  const app = new Application();
  await app.init({
    resizeTo: host,
    resolution: 1,
    autoDensity: true,
    backgroundAlpha: 0,
    antialias: false,
    powerPreference: 'high-performance',
  });

  host.appendChild(app.canvas);
  app.ticker.maxFPS = 60;

  const lines = new Graphics();
  app.stage.addChild(lines);
  const pointer = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };

  const onPointerMove = (event: PointerEvent) => {
    pointer.x = event.clientX / window.innerWidth - 0.5;
    pointer.y = event.clientY / window.innerHeight - 0.5;
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  const draw = (time = 0) => {
    const width = app.screen.width;
    const height = app.screen.height;
    const cx = width / 2;
    const cy = height / 2;
    eased.x += (pointer.x - eased.x) * 0.028;
    eased.y += (pointer.y - eased.y) * 0.028;

    lines.clear();

    if (options.mode === 'final') {
      const radius = Math.min(width, height) * 0.28;
      for (let index = 0; index < 3; index += 1) {
        lines
          .circle(cx, cy, radius + index * 22)
          .stroke({
            color: index === 0 ? 0x14aec2 : 0x496165,
            alpha: index === 0 ? 0.34 : 0.1,
            width: 1,
          });
      }
      return;
    }

    const timeUnit = time / 1000;
    const pullX = eased.x * 180;
    const pullY = eased.y * 120;

    for (let index = 0; index < 10; index += 1) {
      const row = index - 5;
      const offset = row * 46;
      const phase = timeUnit * (0.28 + index * 0.008) + index * 0.8;
      const wave = Math.sin(phase) * 36;
      const alpha =
        index === 5 ? 0.28 : 0.045 + (1 - Math.min(Math.abs(row) / 6, 1)) * 0.1;

      lines
        .moveTo(cx + offset + wave * 0.2, -60)
        .bezierCurveTo(
          cx - 280 + offset * 0.42 + pullX * 0.22,
          height * 0.22 + wave + pullY * 0.12,
          cx + 260 - offset * 0.34 - pullX * 0.34,
          height * 0.66 + Math.cos(phase) * 52 - pullY * 0.12,
          cx + offset * 0.12 + pullX * 0.18,
          height + 60,
        )
        .stroke({
          color: index % 5 === 0 ? 0x14aec2 : 0x496165,
          alpha,
          width: index % 5 === 0 ? 1.1 : 0.75,
        });
    }

    for (let index = 0; index < 4; index += 1) {
      const radius = 110 + index * 74 + Math.sin(timeUnit * 0.38 + index) * 10;
      lines
        .ellipse(cx + pullX * 0.32, cy + pullY * 0.28, radius * 1.45, radius * 0.46)
        .stroke({
          color: index % 2 === 0 ? 0x14aec2 : 0x78e4ee,
          alpha: 0.028,
          width: 1,
        });
    }
  };

  const tick = () => draw(app.ticker.lastTime);
  app.ticker.add(tick);
  draw();
  app.ticker.stop();

  return {
    start() {
      app.ticker.start();
    },
    stop() {
      app.ticker.stop();
    },
    resize() {
      app.resize();
      draw();
    },
    destroy() {
      window.removeEventListener('pointermove', onPointerMove);
      app.ticker.remove(tick);
      app.destroy(true, { children: true, texture: true });
    },
  };
}
