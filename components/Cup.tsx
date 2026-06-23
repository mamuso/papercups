import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import Image from "next/image";
import Link from "next/link";
import type { CupData, CupSize } from "../types/cup";

type CupContentProps = {
  cup: CupData;
  size: CupSize;
};

type CupMapProps = {
  googlemap: React.RefObject<HTMLDivElement | null>;
  size: CupSize;
};

const CupContent = ({ cup, size }: CupContentProps) => {
  const googlemap = useRef<HTMLDivElement>(null);
  const imageSize = size === "large" ? 1200 : 600;

  useEffect(() => {
    if (size !== 'large' || !googlemap.current) {
      return;
    }

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GMAPS ?? "",
      version: 'weekly',
    });
    const latLng = { lat: cup.location.lat, lng: cup.location.lng };

    loader.load().then(() => {
      if (!googlemap.current) {
        return;
      }

      const google = window.google;
      const map = new google.maps.Map(googlemap.current, {
        center: latLng,
        zoom: 15,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
      });

      new google.maps.Marker({
        position: latLng,
        icon: { url: "/marker.png", scaledSize: new google.maps.Size(40, 40) },
        map,
      });
    });
  }, [cup.location.lat, cup.location.lng, size]);

  return (
    <section className={`card ${size}`}>
      <div className="meta">
        <h2>{cup.name}</h2>
        <address>
          <span>{cup.address}</span>
          <CupMap googlemap={googlemap} size={size} />
        </address>
      </div>
      <div className="cup">
        <Image
          src={`/cups/${cup.slug}@${size}.png`}
          alt={`${cup.name} coffee cup`}
          width={imageSize}
          height={imageSize}
          sizes={size === "large" ? "(max-width: 1024px) 130vw, 700px" : "(max-width: 1024px) 180px, 350px"}
          priority={size === "large"}
        />
      </div>
      </section>
  );
}

export function CupMap({ googlemap, size }: CupMapProps) {
  return size === 'large' ? <div id="map" ref={googlemap}></div> : null;
}

export function Cup({ cup, size }: CupContentProps) {
  const linked = size === 'small';
  return (
    (linked) ?
      <Link href={`/pour/${encodeURIComponent(cup.slug)}`} className="card-link">
        <CupContent cup={cup} size={size} />
      </Link>
    : <CupContent cup={cup} size={size} />
  )
}

export default Cup;
