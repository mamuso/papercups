import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo } from 'react';
import CupTitle from './CupTitle';
import { DEFAULT_MARKER_COLOR, type CupData, type CupSize } from '../types/cup';

const MapView = dynamic(() => import('./MapView'), { ssr: false });

type CupProps = {
  cup: CupData;
  size: CupSize;
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

function CupContent({ cup, size }: CupProps) {
  return (
    <div className="cup-card__content">
      <div className="cup-card__media">
        <img
          src={`/cups/${cup.slug}@${size}.png`}
          alt={`${cup.name} coffee cup`}
        />
      </div>
      <div className="cup-card__meta">
        <CupMap cup={cup} size={size} />
        <div className="cup-card__meta-text">
          <CupTitle
            title={cup.name}
            className="cup-card__title"
            accentColor={cup.markerColor ?? DEFAULT_MARKER_COLOR}
          />
          {size === 'large' && (
            <address className="cup-card__address font-mono text-sm uppercase tracking-wide not-italic">
              <span>{cup.address}</span>
            </address>
          )}
        </div>
      </div>
    </div>
  );
}

export function Cup({ cup, size }: CupProps) {
  if (size === 'small') {
    return (
      <Link
        href={`/pour/${encodeURIComponent(cup.slug)}`}
        className={`cup-card cup-card--${size}`}
      >
        <CupContent cup={cup} size={size} />
      </Link>
    );
  }

  return (
    <section className={`cup-card cup-card--${size}`}>
      <CupContent cup={cup} size={size} />
    </section>
  );
}

export default Cup;
