import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: `${process.env.NEXT_PUBLIC_GMAPS}`,
  version: 'weekly',
});

type LatLng = { lat: number; lng: number };

// Renders a single marker centered on the cup location.
export function useSingleCupMap(location: LatLng) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    loader.load().then(() => {
      const google = window.google;
      const map = new google.maps.Map(ref.current as HTMLElement, {
        center: location,
        zoom: 15,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
      });
      new google.maps.Marker({
        position: location,
        icon: { url: '/marker.png', scaledSize: new google.maps.Size(40, 40) },
        map,
      });
    });
  }, [location.lat, location.lng]);

  return ref;
}

// Renders all cups as markers; fits bounds to show them all. Markers open
// an info window with a link to the cup detail page on click.
export function useSurveyMap(cups: Array<{ slug: string; name: string; location: LatLng }>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    loader.load().then(() => {
      const google = window.google;
      const map = new google.maps.Map(ref.current as HTMLElement, {
        center: { lat: 40.4637, lng: 3.7492 },
        zoom: 15,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
      });

      const bounds = new google.maps.LatLngBounds();
      let openInfoWindow: google.maps.InfoWindow | null = null;

      cups.forEach((cup) => {
        const latLng = { lat: cup.location.lat, lng: cup.location.lng };
        const infoWindow = new google.maps.InfoWindow({
          content: `<a href="/pour/${cup.slug}">${cup.name}</a>`,
        });
        const marker = new google.maps.Marker({
          position: latLng,
          icon: { url: '/marker.png', scaledSize: new google.maps.Size(40, 40) },
          title: cup.name,
          map,
        });
        marker.addListener('click', () => {
          openInfoWindow?.close();
          openInfoWindow = infoWindow;
          infoWindow.open({ anchor: marker, map, shouldFocus: true });
        });
        bounds.extend(marker.getPosition() as google.maps.LatLng);
      });

      map.fitBounds(bounds);
    });
  }, [cups]);

  return ref;
}
