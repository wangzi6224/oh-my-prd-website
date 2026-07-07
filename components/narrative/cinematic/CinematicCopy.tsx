import { cinematicScenes, type CinematicScene } from '@/content/cinematicNarrative';

export function CinematicCopy({ scene }: { scene: CinematicScene }) {
  return (
    <article className="cinematic-copy" aria-live="polite">
      <div key={`${scene.id}-copy`} className="cinematic-copy__inner">
        <p className="cinematic-copy__eyebrow">{scene.eyebrow}</p>
        <h1 className="cinematic-copy__title">{scene.title}</h1>
        <p className="cinematic-copy__body">{scene.body}</p>
        <div className="cinematic-copy__tags" aria-label="当前叙事标签">
          {scene.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function CinematicSceneNav({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav className="cinematic-scene-nav" aria-label="滚动叙事场景">
      {cinematicScenes.map((scene, index) => (
        <button
          key={scene.id}
          type="button"
          className={index === activeIndex ? 'is-active' : undefined}
          aria-label={`跳转到${scene.nav}`}
          aria-current={index === activeIndex ? 'step' : undefined}
          onClick={() => onSelect(index)}
        />
      ))}
    </nav>
  );
}
