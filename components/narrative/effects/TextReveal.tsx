import clsx from 'clsx';
import type { ElementType } from 'react';

type TextRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  mode?: 'words' | 'lines';
};

export function TextReveal({
  text,
  as: Component = 'span',
  className,
  id,
  mode = 'words',
}: TextRevealProps) {
  const hasWordSpaces = text.trim().includes(' ');
  const tokens = hasWordSpaces ? text.split(' ') : Array.from(text);

  if (mode === 'lines') {
    return (
      <Component id={id} className={clsx('text-reveal', className)}>
        {text.split('\n').map((line, index) => (
          <span key={`${line}-${index}`} className="reveal-line block overflow-hidden">
            <span className="reveal-word inline-block">{line}</span>
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component id={id} className={clsx('text-reveal', className)}>
      {tokens.map((word, index) => (
        <span key={`${word}-${index}`} className="reveal-mask inline-block overflow-hidden">
          <span className="reveal-word inline-block">{word}</span>
          {hasWordSpaces && index < tokens.length - 1 ? '\u00a0' : null}
        </span>
      ))}
    </Component>
  );
}
