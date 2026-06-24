import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export type MapMarker = {
  href?: string;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
};

type MapViewProps = {
  center?: {
    lat: number;
    lng: number;
  };
  fitBounds?: boolean;
  markers: MapMarker[];
  zoom?: number;
};

const mapTilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;
const tileUrl =
  process.env.NEXT_PUBLIC_MAP_TILE_URL ??
  (mapTilerKey
    ? `https://api.maptiler.com/maps/dataviz-light/256/{z}/{x}/{y}.png?key=${mapTilerKey}`
    : undefined);

const tileAttribution =
  process.env.NEXT_PUBLIC_MAP_TILE_ATTRIBUTION ??
  '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';

export default function MapView({
  center,
  fitBounds = false,
  markers,
  zoom = 15,
}: MapViewProps) {
  const mapElement = useRef<HTMLDivElement>(null);
  const showFallback = !tileUrl || markers.length === 0;

  useEffect(() => {
    if (!mapElement.current || showFallback) {
      return;
    }

    let cancelled = false;
    let cleanup = () => {};

    import("leaflet").then((L) => {
      if (cancelled || !mapElement.current) {
        return;
      }

      const markerIcon = L.icon({
        iconUrl: "/marker.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      const initialCenter = center ?? markers[0].position;
      const map = L.map(mapElement.current, {
        center: [initialCenter.lat, initialCenter.lng],
        zoom,
        scrollWheelZoom: false,
      });

      L.tileLayer(tileUrl, {
        attribution: tileAttribution,
        crossOrigin: true,
        maxZoom: 20,
        minZoom: 1,
      }).addTo(map);

      const bounds = L.latLngBounds([]);

      markers.forEach((marker) => {
        const point: [number, number] = [marker.position.lat, marker.position.lng];
        const leafletMarker = L.marker(point, {
          icon: markerIcon,
          title: marker.title,
        }).addTo(map);

        if (marker.href) {
          const link = document.createElement("a");
          link.href = marker.href;
          link.textContent = marker.title;
          leafletMarker.bindPopup(link);
        }

        bounds.extend(point);
      });

      if (fitBounds && bounds.isValid()) {
        map.fitBounds(bounds, { padding: [24, 24] });
      }

      cleanup = () => {
        map.remove();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [center, fitBounds, markers, showFallback, zoom]);

  return (
    <div className="map" ref={mapElement} aria-label="Coffee shop locations map">
      {showFallback ? (
        <div className="map-fallback">
          <span>Map unavailable</span>
        </div>
      ) : null}
    </div>
  );
}
