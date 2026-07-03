import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
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

function getMarkerBounds(
  markers: MapMarkerData[]
): [[number, number], [number, number]] {
  let west = markers[0].position.lng;
  let south = markers[0].position.lat;
  let east = west;
  let north = south;

  for (let index = 1; index < markers.length; index += 1) {
    const marker = markers[index];
    west = Math.min(west, marker.position.lng);
    south = Math.min(south, marker.position.lat);
    east = Math.max(east, marker.position.lng);
    north = Math.max(north, marker.position.lat);
  }

  return [
    [west, south],
    [east, north],
  ];
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
  const initialBounds = fitBounds ? getMarkerBounds(markers) : undefined;

  return (
    <Map
      className="map"
      center={fitBounds ? undefined : [initialCenter.lng, initialCenter.lat]}
      zoom={fitBounds ? undefined : zoom}
      bounds={initialBounds}
      fitBoundsOptions={
        fitBounds ? { animate: false, padding: 24, maxZoom: 15 } : undefined
      }
      scrollZoom={false}
      cooperativeGestures
      aria-label="Coffee shop locations map"
    >
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
