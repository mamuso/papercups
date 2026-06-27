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

export default function MapView({
  center,
  fitBounds = false,
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
