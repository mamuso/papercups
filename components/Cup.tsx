import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo } from 'react';
import type { CupData, CupSize } from '../types/cup';

const MapView = dynamic(() => import('./MapView'), { ssr: false });

type CupContentProps = {
  cup: CupData;
  size: CupSize;
};

const CupContent = ({ cup, size }: CupContentProps) => {
  return (
    <section className={`card ${size}`}>
      <div className="meta">
        <h2>{cup.name}</h2>
        <address>
          <span>{cup.address}</span>
          <CupMap cup={cup} size={size} />
        </address>
      </div>
      <div className="cup">
        <img
          src={`/cups/${cup.slug}@${size}.png`}
          alt={`${cup.name} coffee cup`}
        />
      </div>
    </section>
  );
};

export function CupMap({ cup, size }: CupContentProps) {
  const markers = useMemo(
    () => [{ position: cup.location, title: cup.name }],
    [cup]
  );

  return size === 'large' ? (
    <MapView center={cup.location} markers={markers} />
  ) : null;
}

export function Cup({ cup, size }: CupContentProps) {
  const linked = size === 'small';

  return linked ? (
    <Link href={`/pour/${encodeURIComponent(cup.slug)}`} className="card-link">
      <CupContent cup={cup} size={size} />
    </Link>
  ) : (
    <CupContent cup={cup} size={size} />
  );
}

export default Cup;
