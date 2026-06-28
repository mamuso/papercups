import { useEffect, useRef } from "react";

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
  markerClassName?: string;
  markers: MapMarker[];
  zoom?: number;
};

const customTileUrl = process.env.NEXT_PUBLIC_MAP_TILE_URL;
const customTileAttribution = process.env.NEXT_PUBLIC_MAP_TILE_ATTRIBUTION;

const cartoAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function getCartoTileUrl(isDark: boolean) {
  const variant = isDark ? "dark_all" : "light_all";
  return `https://cartodb-basemaps-{s}.global.ssl.fastly.net/${variant}/{z}/{x}/{y}.png`;
}

function prefersDarkMode() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

const markerSvgHtml = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="10" cy="10" r="10" fill="currentColor"/>
  <circle cx="10" cy="10" r="9.5" stroke="black" stroke-opacity="0.15"/>
  <circle cx="10" cy="10" r="5" fill="white"/>
  <circle cx="10" cy="10" r="5.5" stroke="black" stroke-opacity="0.12"/>
</svg>
`.trim();

function createMarkerIcon(
  L: typeof import("leaflet"),
  markerClassName: string
) {
  return L.divIcon({
    className: `map-marker ${markerClassName}`,
    html: markerSvgHtml,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });
}

export default function MapView({
  center,
  fitBounds = false,
  markerClassName = "text-foreground",
  markers,
  zoom = 15,
}: MapViewProps) {
  const mapElement = useRef<HTMLDivElement>(null);
  const showFallback = markers.length === 0;

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

      const markerIcon = createMarkerIcon(L, markerClassName);

      const initialCenter = center ?? markers[0].position;
      const map = L.map(mapElement.current, {
        center: [initialCenter.lat, initialCenter.lng],
        zoom,
        scrollWheelZoom: false,
      });

      const createTileLayer = (isDark: boolean) =>
        customTileUrl
          ? L.tileLayer(customTileUrl, {
              attribution: customTileAttribution ?? cartoAttribution,
              crossOrigin: true,
              maxZoom: 20,
              minZoom: 1,
            })
          : L.tileLayer(getCartoTileUrl(isDark), {
              attribution: cartoAttribution,
              crossOrigin: true,
              maxZoom: 20,
              minZoom: 1,
              subdomains: "abcd",
            });

      let tileLayer = createTileLayer(prefersDarkMode()).addTo(map);

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

      const refreshMapSize = () => {
        map.invalidateSize();
      };

      requestAnimationFrame(refreshMapSize);
      window.setTimeout(refreshMapSize, 100);

      const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleColorSchemeChange = () => {
        if (customTileUrl) {
          return;
        }

        map.removeLayer(tileLayer);
        tileLayer = createTileLayer(colorSchemeQuery.matches).addTo(map);
      };

      colorSchemeQuery.addEventListener("change", handleColorSchemeChange);

      cleanup = () => {
        colorSchemeQuery.removeEventListener("change", handleColorSchemeChange);
        map.remove();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [center, fitBounds, markerClassName, markers, showFallback, zoom]);

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
