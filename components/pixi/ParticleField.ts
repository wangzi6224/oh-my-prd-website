import { Application, Container, Graphics } from 'pixi.js';

type Density = 'desktop' | 'mobile';

type Particle = {
  view: Graphics;
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
};

export async function createParticleField(
  host: HTMLElement,
  options: { density: Density },
) {
  const app = new Application();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  await app.init({
    resizeTo: host,
    resolution: dpr,
    autoDensity: true,
    backgroundAlpha: 0,
    antialias: true,
  });

  host.appendChild(app.canvas);
  const layer = new Container();
  app.stage.addChild(layer);

  const count = options.density === 'mobile' ? 420 : 1500;
  const particles: Particle[] = [];

  for (let index = 0; index < count; index += 1) {
    const radius = Math.random() * 1.4 + 0.35;
    const view = new Graphics()
      .circle(0, 0, radius)
      .fill({ color: 0x14aec2, alpha: Math.random() * 0.38 + 0.08 });
    const particle = {
      view,
      x: Math.random() * app.renderer.width,
      y: Math.random() * app.renderer.height,
      radius,
      speed: Math.random() * 0.34 + 0.06,
      drift: Math.random() * 0.7 + 0.15,
    };
    view.x = particle.x;
    view.y = particle.y;
    particles.push(particle);
    layer.addChild(view);
  }

  let mouseX = 0;
  let mouseY = 0;
  const onPointerMove = (event: PointerEvent) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 20;
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  const tick = () => {
    const width = app.renderer.width;
    const height = app.renderer.height;
    particles.forEach((particle, index) => {
      particle.y += particle.speed;
      particle.x += Math.sin((performance.now() / 1200 + index) * 0.8) * particle.drift;
      if (particle.y > height + 10) particle.y = -10;
      particle.view.x = particle.x + mouseX;
      particle.view.y = particle.y + mouseY;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.x < -10) particle.x = width + 10;
    });
  };

  app.ticker.add(tick);
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
    },
    destroy() {
      window.removeEventListener('pointermove', onPointerMove);
      app.ticker.remove(tick);
      app.destroy(true, { children: true, texture: true });
    },
  };
}
