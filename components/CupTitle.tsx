import type { ElementType } from 'react';
import { staatliches } from '../lib/fonts';
import type { CupSize } from '../types/cup';

type CupTitleProps = {
  title: string;
  size?: CupSize;
  as?: ElementType;
  className?: string;
  accentColor?: string;
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
  accentColor,
}: CupTitleProps) {
  return (
    <Tag
      className={[
        'cup-title',
        staatliches.className,
        size ? sizeClasses[size] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {title}
      <span className="cup-title__period" style={accentColor ? { color: accentColor } : undefined}>.</span>
    </Tag>
  );
}

export default CupTitle;
