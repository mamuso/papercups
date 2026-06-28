import type { ElementType } from 'react';
import { getTitleFont } from '../lib/titleFonts';
import type { CupSize } from '../types/cup';

type CupTitleProps = {
  title: string;
  size?: CupSize;
  as?: ElementType;
  className?: string;
};

const sizeClasses: Record<CupSize, string> = {
  small: 'text-xl',
  large: 'text-4xl md:text-5xl',
};

export function CupTitle({
  title,
  size = 'large',
  as: Tag = 'h2',
  className = '',
}: CupTitleProps) {
  const font = getTitleFont(title);

  return (
    <Tag
      className={[
        'cup-title',
        `cup-title--${font.id}`,
        font.className,
        size ? sizeClasses[size] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-title-font={font.id}
    >
      {title}
    </Tag>
  );
}

export default CupTitle;
