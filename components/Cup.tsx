import Link from 'next/link';
import { useSingleCupMap } from '../hooks/useLeafletMap';

interface Cup {
  slug: string;
  name: string;
  address: string;
  city: string;
  country: string;
  created_at: string;
  location: { lat: number; lng: number };
}

export function CupThumbnail({ cup }: { cup: Cup }) {
  return (
    <Link href={`/pour/${encodeURIComponent(cup.slug)}`}>
      <a>
        <section className="card small">
          <div className="meta">
            <h2>{cup.name}</h2>
            <address>
              <span>{cup.address}</span>
            </address>
          </div>
          <div className="cup">
            <img src={`/cups/${cup.slug}@small.png`} alt={`${cup.name} coffee cup`} />
          </div>
        </section>
      </a>
    </Link>
  );
}

export function CupDetail({ cup }: { cup: Cup }) {
  const mapRef = useSingleCupMap(cup.location);

  return (
    <section className="card large">
      <div className="meta">
        <h2>{cup.name}</h2>
        <address>
          <span>{cup.address}</span>
          <div id="map" ref={mapRef}></div>
        </address>
      </div>
      <div className="cup">
        <img src={`/cups/${cup.slug}@large.png`} alt={`${cup.name} coffee cup`} />
      </div>
    </section>
  );
}

export default CupThumbnail;
