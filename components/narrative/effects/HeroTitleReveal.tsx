import clsx from 'clsx';

type HeroTitleRevealProps = {
  id?: string;
  lines: string[];
  className?: string;
};

export function HeroTitleReveal({
  id,
  lines,
  className,
}: HeroTitleRevealProps) {
  return (
    <h1 id={id} className={clsx('hero-title', className)}>
      {lines.map((line, lineIndex) => (
        <span key={`${line}-${lineIndex}`} className="hero-title-line">
          <span className="hero-title-line-inner">
            {Array.from(line).map((glyph, glyphIndex) => (
              <span
                key={`${glyph}-${glyphIndex}`}
                className="hero-glyph"
                aria-hidden="true"
              >
                {glyph === ' ' ? '\u00a0' : glyph}
              </span>
            ))}
          </span>
        </span>
      ))}
      <span className="hero-title-sheen" aria-hidden="true" />
      <span className="sr-only">{lines.join('')}</span>
    </h1>
  );
}
