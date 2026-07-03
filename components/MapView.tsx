import { LngLatBounds } from 'maplibre-gl';
import { useEffect } from 'react';
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  useMap,
} from './ui/map';
import { DEFAULT_MARKER_COLOR } from '../types/cup';

export type MapMarkerData = {
  color?: string;
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
  markers: MapMarkerData[];
  zoom?: number;
};

const markerColorPattern = /^#[0-9A-Fa-f]{6}$/;

function resolveMarkerColor(color?: string) {
  return color && markerColorPattern.test(color) ? color : DEFAULT_MARKER_COLOR;
}

function FitBounds({ markers }: { markers: MapMarkerData[] }) {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded || markers.length === 0) {
      return;
    }

    const bounds = markers.reduce(
      (nextBounds, marker) =>
        nextBounds.extend([marker.position.lng, marker.position.lat]),
      new LngLatBounds()
    );

    map.fitBounds(bounds, { animate: false, padding: 24, maxZoom: 15 });
  }, [isLoaded, map, markers]);

  return null;
}

export default function MapView({
  center,
  fitBounds = false,
  markers,
  zoom = 15,
}: MapViewProps) {
  if (markers.length === 0) {
    return (
      <div className="map" aria-label="Coffee shop locations map">
        <div className="map-fallback">
          <span>Map unavailable</span>
        </div>
      </div>
    );
  }

  const initialCenter = center ?? markers[0].position;

  return (
    <Map
      className="map"
      center={[initialCenter.lng, initialCenter.lat]}
      zoom={zoom}
      scrollZoom={false}
      cooperativeGestures
      aria-label="Coffee shop locations map"
    >
      {fitBounds ? <FitBounds markers={markers} /> : null}
      {markers.map((marker) => {
        const color = resolveMarkerColor(marker.color);

        return (
          <MapMarker
            key={`${marker.position.lat}:${marker.position.lng}:${marker.title}`}
            latitude={marker.position.lat}
            longitude={marker.position.lng}
            anchor="center"
          >
            <MarkerContent>
              <div
                className="map-marker"
                style={{ color }}
                title={marker.title}
                aria-label={marker.title}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="10" cy="10" r="10" fill="currentColor" />
                  <circle
                    cx="10"
                    cy="10"
                    r="9.5"
                    stroke="black"
                    strokeOpacity="0.15"
                  />
                  <circle cx="10" cy="10" r="5" fill="white" />
                  <circle
                    cx="10"
                    cy="10"
                    r="5.5"
                    stroke="black"
                    strokeOpacity="0.12"
                  />
                </svg>
              </div>
            </MarkerContent>
            {marker.href ? (
              <MarkerPopup>
                <a className="map-popup__link" href={marker.href}>
                  {marker.title}
                </a>
              </MarkerPopup>
            ) : null}
          </MapMarker>
        );
      })}
      <MapControls />
    </Map>
  );
}
