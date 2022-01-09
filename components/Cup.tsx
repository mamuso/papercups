import {useEffect, useRef} from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import Link from "next/link";

const CupContent = ({ cup, size }: any) => {
  const googlemap = useRef(null);
  if (size === 'large') {

    useEffect(() => {
      const loader = new Loader({
        apiKey: `${process.env.NEXT_PUBLIC_GMAPS}`,
        version: 'weekly',
      });
      let map;
      loader.load().then(() => {
        const google = window.google;
        map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });
      });
    });
  }

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
        <img
          src={`/cups/${cup.slug}@${size}.png`}
          alt={`${cup.name} coffee cup`}
        />
      </div>
      </section>
  );
}

export function CupMap({ googlemap, size }: any) {
  const mapped = (size == 'large')
  return (
    (mapped) ? <div id="map" ref={googlemap} ></div> : <span></span>
  )
}

export function Cup({ cup, size }: any) {
  const linked = (size == 'small')
  return (
    (linked) ?
      <Link href={`/pour/${encodeURIComponent(cup.slug)}`}>
        <a>
          <CupContent cup={cup} size={size} />
        </a>
      </Link>
    : <CupContent cup={cup} size={size} />
  )
}

export default Cup;