import { type CinematicItem, type CinematicScene } from '@/content/cinematicNarrative';

function itemClass(base: string, item: CinematicItem) {
  return [base, item.tone ? `${base}--${item.tone}` : ''].filter(Boolean).join(' ');
}

export function MorphWorkbench({ scene }: { scene: CinematicScene }) {
  return (
    <div className="morph-workbench" aria-hidden="true">
      <div className="morph-workbench__frame">
        <div className="morph-workbench__topbar">
          <div className="morph-workbench__traffic">
            <span />
            <span />
            <span />
          </div>
          <span className="morph-workbench__label">{scene.label}</span>
          <span className="morph-workbench__state">{scene.state}</span>
        </div>

        <svg className="morph-workbench__links" viewBox="0 0 900 540" preserveAspectRatio="none">
          <path pathLength={1} d="M110 132 C260 64 408 120 520 194 C660 286 742 216 822 132" />
          <path pathLength={1} d="M118 404 C262 306 374 350 506 262 C642 170 724 324 824 408" />
          <path pathLength={1} d="M204 118 C284 248 336 322 456 410" />
          <path pathLength={1} d="M724 96 C664 210 650 318 782 444" />
        </svg>

        <div className="morph-workbench__beam morph-workbench__beam--a" />
        <div className="morph-workbench__beam morph-workbench__beam--b" />
        <div className="morph-workbench__beam morph-workbench__beam--c" />

        <div className="morph-workbench__body">
          <aside className="morph-panel morph-panel--left">
            <div className="morph-panel__title">
              <span>{scene.leftTitle}</span>
              <span>构件</span>
            </div>
            <div className="morph-list">
              {scene.bricks.map((item, index) => (
                <div
                  key={`${scene.id}-brick-${item.text}`}
                  className={itemClass('morph-brick', item)}
                  style={{ transitionDelay: `${index * 28}ms` }}
                >
                  <span className="morph-brick__dot" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </aside>

          <section className="morph-panel morph-panel--main">
            <p className="morph-panel__kicker">{scene.mainKicker}</p>
            <h2>{scene.moduleTitle}</h2>
            <p>{scene.moduleSubtitle}</p>
            <div className="morph-blocks">
              {scene.blocks.map((item, index) => (
                <div
                  key={`${scene.id}-block-${item.text}`}
                  className={itemClass('morph-block', item)}
                  style={{ transitionDelay: `${index * 34}ms` }}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </section>

          <aside className="morph-panel morph-panel--side">
            <div className="morph-panel__title">
              <span>{scene.sideTitle}</span>
              <span>状态</span>
            </div>
            <div className="morph-side-stack">
              {scene.sideCards.map((item, index) => (
                <div
                  key={`${scene.id}-side-${item.text}`}
                  className={itemClass('morph-side-card', item)}
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="morph-workbench__foundation">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
