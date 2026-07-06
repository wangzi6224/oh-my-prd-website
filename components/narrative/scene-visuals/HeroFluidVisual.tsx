import { CoreOrb } from './CoreOrb';

const signalNodes = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${9 + ((index * 17) % 82)}%`,
  top: `${11 + ((index * 23) % 76)}%`,
  delay: `${(index % 7) * 0.38}s`,
}));

export function HeroFluidVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hero-fluid-field absolute inset-[-12%]" />
      <div className="hero-signal-mesh absolute inset-0" />
      <div className="hero-light-slice absolute left-1/2 top-1/2 h-[76vh] w-[22vw] -translate-x-1/2 -translate-y-1/2" />
      <div className="hero-data-field absolute inset-0">
        {signalNodes.map((node) => (
          <span
            key={node.id}
            className="hero-data-node"
            style={{
              left: node.left,
              top: node.top,
              animationDelay: node.delay,
            }}
          />
        ))}
      </div>
      <div className="hero-underwater-core absolute left-1/2 top-[54%] w-[min(56vw,620px)] -translate-x-1/2 -translate-y-1/2 opacity-55 blur-[2px]">
        <CoreOrb label="Requirement Core" compact />
      </div>
      <div className="hero-transition-thread absolute bottom-[-8vh] left-1/2 h-[38vh] w-px -translate-x-1/2" />
    </div>
  );
}
