import { Application, Container, Graphics } from 'pixi.js';

export async function createKnowledgeGraph(host: HTMLElement) {
  const app = new Application();
  await app.init({
    resizeTo: host,
    resolution: Math.min(window.devicePixelRatio || 1, 2),
    autoDensity: true,
    backgroundAlpha: 0,
    antialias: true,
  });

  host.appendChild(app.canvas);
  const layer = new Container();
  app.stage.addChild(layer);

  const nodes = Array.from({ length: 72 }, (_, index) => {
    const node = new Graphics()
      .circle(0, 0, index % 7 === 0 ? 3 : 1.7)
      .fill({ color: index % 7 === 0 ? 0x14aec2 : 0x8e9c9e, alpha: 0.5 });
    layer.addChild(node);
    return {
      node,
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 240 + 40,
      speed: Math.random() * 0.002 + 0.0008,
    };
  });

  const tick = () => {
    const cx = app.renderer.width / 2;
    const cy = app.renderer.height / 2;
    nodes.forEach((item) => {
      item.angle += item.speed;
      item.node.x = cx + Math.cos(item.angle) * item.radius;
      item.node.y = cy + Math.sin(item.angle) * item.radius * 0.62;
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
      app.ticker.remove(tick);
      app.destroy(true, { children: true, texture: true });
    },
  };
}
