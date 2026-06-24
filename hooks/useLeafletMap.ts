import { useLayoutEffect, useRef } from 'react';

type LatLng = { lat: number; lng: number };

function useMapTiler() {
  return process.env.NEXT_PUBLIC_MAP_PROVIDER === 'maptiler';
}

function getMapTilerKey() {
  return process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
}

function getMapTilerStyle() {
  return process.env.NEXT_PUBLIC_MAPTILER_STYLE || 'dataviz-v4';
}

function addMapTiles(L: any, map: any) {
  if (useMapTiler()) {
    const apiKey = getMapTilerKey();
    const style = getMapTilerStyle();
    if (!apiKey) return;

    L.tileLayer(
      `https://api.maptiler.com/maps/${style}/{z}/{x}/{y}.png?key=${apiKey}`,
      {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution:
          '&copy; <a href="https://www.maptiler.com/copyright/" target="_blank" rel="noreferrer">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>',
        crossOrigin: true,
      }
    ).addTo(map);
    return;
  }

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20,
  }).addTo(map);
}

function canRenderMap() {
  return !useMapTiler() || !!getMapTilerKey();
}

function cupMarkerIcon(L: any) {
  return L.icon({
    iconUrl: '/marker.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
}

type LeafletMap = {
  remove: () => void;
  whenReady: (fn: () => void) => void;
  invalidateSize: () => void;
  getCenter: () => { lat: number; lng: number };
  getZoom: () => number;
  setView: (center: [number, number] | { lat: number; lng: number }, zoom: number, options?: { animate: boolean }) => void;
  fitBounds: (bounds: unknown, options?: { padding: [number, number] }) => void;
};

function refreshMap(map: LeafletMap) {
  map.invalidateSize();
  const center = map.getCenter();
  map.setView([center.lat, center.lng], map.getZoom(), { animate: false });
}

function scheduleMapRefresh(map: LeafletMap) {
  const run = () => refreshMap(map);
  map.whenReady(run);
  requestAnimationFrame(run);
  window.setTimeout(run, 0);
  window.setTimeout(run, 100);
}

function observeMapResize(container: HTMLElement, map: LeafletMap) {
  const observer = new ResizeObserver(() => refreshMap(map));
  observer.observe(container);
  return observer;
}

function containerIsReady(container: HTMLElement) {
  return container.offsetWidth > 0 && container.offsetHeight > 0;
}

// Renders a single marker centered on the cup location.
export function useSingleCupMap(location: LatLng) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container || !canRenderMap()) return;

    let map: LeafletMap | undefined;
    let observer: ResizeObserver | undefined;
    let cancelled = false;
    let retryId = 0;

    const init = () => {
      if (cancelled || !ref.current || !containerIsReady(container)) {
        retryId = window.requestAnimationFrame(init);
        return;
      }

      import('leaflet').then((L) => {
        if (cancelled || !ref.current || !containerIsReady(container)) return;

        const cupMap = L.map(container, {
          center: [location.lat, location.lng],
          zoom: 15,
        });
        map = cupMap;

        addMapTiles(L, cupMap);
        L.marker([location.lat, location.lng], { icon: cupMarkerIcon(L) }).addTo(cupMap);
        scheduleMapRefresh(cupMap);
        observer = observeMapResize(container, cupMap);
      });
    };

    init();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(retryId);
      observer?.disconnect();
      map?.remove();
    };
  }, [location.lat, location.lng]);

  return ref;
}

// Renders all cups as markers; fits bounds to show them all. Markers open
// a popup with a link to the cup detail page on click.
export function useSurveyMap(cups: Array<{ slug: string; name: string; location: LatLng }>) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container || cups.length === 0 || !canRenderMap()) return;

    let map: LeafletMap | undefined;
    let observer: ResizeObserver | undefined;
    let cancelled = false;
    let retryId = 0;

    const init = () => {
      if (cancelled || !ref.current || !containerIsReady(container)) {
        retryId = window.requestAnimationFrame(init);
        return;
      }

      import('leaflet').then((L) => {
        if (cancelled || !ref.current || !containerIsReady(container)) return;

        const surveyMap = L.map(container, {
          center: [40.4637, 3.7492],
          zoom: 15,
        });
        map = surveyMap;

        addMapTiles(L, surveyMap);

        const icon = cupMarkerIcon(L);
        const bounds = L.latLngBounds([]);

        cups.forEach((cup) => {
          const { lat, lng } = cup.location;
          L.marker([lat, lng], { icon, title: cup.name })
            .bindPopup(`<a href="/pour/${cup.slug}">${cup.name}</a>`)
            .addTo(surveyMap);
          bounds.extend([lat, lng]);
        });

        surveyMap.fitBounds(bounds, { padding: [50, 50] });
        scheduleMapRefresh(surveyMap);
        observer = observeMapResize(container, surveyMap);
      });
    };

    init();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(retryId);
      observer?.disconnect();
      map?.remove();
    };
  }, [cups]);

  return ref;
}
