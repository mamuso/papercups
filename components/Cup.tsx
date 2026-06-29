import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import CupTitle from './CupTitle';
import { getCardTexture } from '../lib/cardTextures';
import { DEFAULT_MARKER_COLOR, type CupData, type CupSize } from '../types/cup';

const MapView = dynamic(() => import('./MapView'), { ssr: false });

type CupProps = {
  cup: CupData;
  size: CupSize;
};

function cupCardClassName(size: CupSize) {
  return `cup-card cup-card--${size}`;
}

function cupCardStyle(textureUrl: string): CSSProperties {
  return {
    '--cup-card-texture': `url("${textureUrl}")`,
    backgroundColor: 'var(--cup-card-background)',
  } as CSSProperties;
}

const CupContent = ({ cup, size }: CupProps) => {
  return (
    <>
      <div>
        <CupTitle title={cup.name} size={size} />
        <address className="font-mono text-sm uppercase tracking-wide not-italic">
          <span>{cup.address}</span>
          <CupMap cup={cup} size={size} />
        </address>
      </div>
      <div>
        <img
          src={`/cups/${cup.slug}@${size}.png`}
          alt={`${cup.name} coffee cup`}
        />
      </div>
    </>
  );
};

export function CupMap({ cup, size }: CupProps) {
  const markers = useMemo(
    () => [
      {
        position: cup.location,
        title: cup.name,
        color: cup.markerColor ?? DEFAULT_MARKER_COLOR,
      },
    ],
    [cup]
  );

  return size === 'large' ? (
    <MapView center={cup.location} markers={markers} />
  ) : null;
}

export function Cup({ cup, size }: CupProps) {
  const className = cupCardClassName(size);
  const texture = getCardTexture(cup.name);
  const style = cupCardStyle(texture.url);

  if (size === 'small') {
    return (
      <Link
        href={`/pour/${encodeURIComponent(cup.slug)}`}
        className={className}
        data-cup-texture={texture.id}
        style={style}
      >
        <CupContent cup={cup} size={size} />
      </Link>
    );
  }

  return (
    <section className={className} data-cup-texture={texture.id} style={style}>
      <CupContent cup={cup} size={size} />
    </section>
  );
}

export default Cup;
