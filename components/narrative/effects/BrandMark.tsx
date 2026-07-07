import Image from 'next/image';
import clsx from 'clsx';

export function BrandMark({
  size = 'md',
  showName = true,
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const asset = showName
    ? `${basePath}/logo/oh-my-prd-logo-dark.svg`
    : `${basePath}/logo/oh-my-prd-mark.svg`;

  return (
    <div className={clsx('brand-mark inline-flex items-center gap-3', className)}>
      <Image
        className={clsx(
          'brand-logo block object-contain drop-shadow-[0_18px_58px_rgba(20,174,194,0.28)]',
          showName
            ? [
                size === 'sm' && 'h-8 w-[107px]',
                size === 'md' && 'h-[72px] w-[197px]',
                size === 'lg' && 'h-24 w-[263px]',
              ]
            : [
                size === 'sm' && 'size-8',
                size === 'md' && 'size-10',
                size === 'lg' && 'size-16',
              ],
        )}
        src={asset}
        width={showName ? 850 : 512}
        height={showName ? 310 : 512}
        alt={showName ? 'Oh My PRD' : ''}
        aria-hidden={showName ? undefined : 'true'}
      />
    </div>
  );
}
