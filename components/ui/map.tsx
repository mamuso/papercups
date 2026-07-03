// Adapted from mapcn's MIT-licensed map component:
// https://github.com/AnmolSaini16/mapcn

import MapLibreGL, {
  type MapOptions,
  type MarkerOptions,
  type PopupOptions,
} from 'maplibre-gl';
import { Minus, Plus } from 'lucide-react';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

type Theme = 'light' | 'dark';

const defaultStyles = {
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
};

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function getDocumentTheme(): Theme | null {
  if (typeof document === 'undefined') {
    return null;
  }

  if (document.documentElement.classList.contains('dark')) {
    return 'dark';
  }

  if (document.documentElement.classList.contains('light')) {
    return 'light';
  }

  return null;
}

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function useResolvedTheme(theme?: Theme) {
  const [detectedTheme, setDetectedTheme] = useState<Theme>(
    () => getDocumentTheme() ?? getSystemTheme()
  );

  useEffect(() => {
    if (theme) {
      return;
    }

    const updateDocumentTheme = () => {
      const documentTheme = getDocumentTheme();
      if (documentTheme) {
        setDetectedTheme(documentTheme);
      }
    };

    const observer = new MutationObserver(updateDocumentTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = (event: MediaQueryListEvent) => {
      if (!getDocumentTheme()) {
        setDetectedTheme(event.matches ? 'dark' : 'light');
      }
    };

    colorScheme.addEventListener('change', updateSystemTheme);

    return () => {
      observer.disconnect();
      colorScheme.removeEventListener('change', updateSystemTheme);
    };
  }, [theme]);

  return theme ?? detectedTheme;
}

type MapContextValue = {
  map: MapLibreGL.Map | null;
  isLoaded: boolean;
};

const MapContext = createContext<MapContextValue | null>(null);

export function useMap() {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error('useMap must be used within a Map component');
  }

  return context;
}

type MapStyle = string | MapLibreGL.StyleSpecification;

type MapProps = Omit<MapOptions, 'container' | 'style'> & {
  'aria-label'?: string;
  children?: ReactNode;
  className?: string;
  styles?: {
    light?: MapStyle;
    dark?: MapStyle;
  };
  theme?: Theme;
};

export type MapRef = MapLibreGL.Map;

export const Map = forwardRef<MapRef, MapProps>(function Map(
  { 'aria-label': ariaLabel, children, className, styles, theme, ...options },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MapLibreGL.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const resolvedTheme = useResolvedTheme(theme);
  const initialOptions = useRef(options);
  const mapStyles = useMemo(
    () => ({
      dark: styles?.dark ?? defaultStyles.dark,
      light: styles?.light ?? defaultStyles.light,
    }),
    [styles]
  );
  const currentStyle = useRef<MapStyle | null>(null);

  useImperativeHandle(ref, () => map as MapLibreGL.Map, [map]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const style =
      resolvedTheme === 'dark' ? mapStyles.dark : mapStyles.light;
    currentStyle.current = style;

    const instance = new MapLibreGL.Map({
      container: containerRef.current,
      style,
      attributionControl: { compact: true },
      renderWorldCopies: false,
      ...initialOptions.current,
    });

    const handleLoad = () => setIsLoaded(true);
    instance.on('load', handleLoad);
    setMap(instance);

    return () => {
      instance.off('load', handleLoad);
      instance.remove();
      setMap(null);
      setIsLoaded(false);
    };
    // The map instance owns its initial options and is intentionally created once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }

    const style =
      resolvedTheme === 'dark' ? mapStyles.dark : mapStyles.light;

    if (currentStyle.current !== style) {
      currentStyle.current = style;
      map.setStyle(style, { diff: true });
    }
  }, [map, mapStyles, resolvedTheme]);

  const context = useMemo(() => ({ map, isLoaded }), [map, isLoaded]);

  return (
    <MapContext.Provider value={context}>
      <div
        ref={containerRef}
        aria-label={ariaLabel}
        role={ariaLabel ? 'region' : undefined}
        className={joinClasses('relative h-full w-full overflow-hidden', className)}
      >
        {map && children}
      </div>
    </MapContext.Provider>
  );
});

type MarkerContextValue = {
  map: MapLibreGL.Map | null;
  marker: MapLibreGL.Marker;
};

const MarkerContext = createContext<MarkerContextValue | null>(null);

function useMarker() {
  const context = useContext(MarkerContext);

  if (!context) {
    throw new Error('Marker components must be used within MapMarker');
  }

  return context;
}

type MapMarkerProps = Omit<MarkerOptions, 'element'> & {
  children: ReactNode;
  latitude: number;
  longitude: number;
};

export function MapMarker({
  children,
  latitude,
  longitude,
  ...options
}: MapMarkerProps) {
  const { map } = useMap();
  const [marker] = useState(() => {
    const element = document.createElement('div');
    return new MapLibreGL.Marker({
      element,
      ...options,
    }).setLngLat([longitude, latitude]);
  });

  useEffect(() => {
    if (!map) {
      return;
    }

    marker.addTo(map);
    return () => {
      marker.remove();
    };
  }, [map, marker]);

  useEffect(() => {
    marker.setLngLat([longitude, latitude]);
  }, [latitude, longitude, marker]);

  return (
    <MarkerContext.Provider value={{ map, marker }}>
      {children}
    </MarkerContext.Provider>
  );
}

type MarkerContentProps = {
  children: ReactNode;
};

export function MarkerContent({ children }: MarkerContentProps) {
  const { marker } = useMarker();
  return createPortal(children, marker.getElement());
}

type MarkerPopupProps = Omit<PopupOptions, 'className' | 'closeButton'> & {
  children: ReactNode;
  className?: string;
};

export function MarkerPopup({
  children,
  className,
  ...options
}: MarkerPopupProps) {
  const { map, marker } = useMarker();
  const [container] = useState(() => document.createElement('div'));
  const [popup] = useState(
    () =>
      new MapLibreGL.Popup({
        closeButton: false,
        offset: 16,
        ...options,
      })
        .setMaxWidth('none')
        .setDOMContent(container)
  );

  useEffect(() => {
    if (!map) {
      return;
    }

    popup.setDOMContent(container);
    marker.setPopup(popup);
    return () => {
      marker.setPopup(null);
      popup.remove();
    };
  }, [container, map, marker, popup]);

  return createPortal(
    <div className={joinClasses('map-popup', className)}>{children}</div>,
    container
  );
}

type MapControlsProps = {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
};

const controlPositions = {
  'top-left': 'left-2 top-2',
  'top-right': 'right-2 top-2',
  'bottom-left': 'bottom-10 left-2',
  'bottom-right': 'bottom-10 right-2',
};

export function MapControls({
  className,
  position = 'bottom-right',
}: MapControlsProps) {
  const { map } = useMap();
  const zoomIn = useCallback(() => {
    map?.zoomTo(map.getZoom() + 1, { duration: 300 });
  }, [map]);
  const zoomOut = useCallback(() => {
    map?.zoomTo(map.getZoom() - 1, { duration: 300 });
  }, [map]);

  return (
    <div
      className={joinClasses(
        'absolute z-10 flex flex-col overflow-hidden rounded border border-black/15 bg-background shadow-sm',
        controlPositions[position],
        className
      )}
    >
      <button
        type="button"
        onClick={zoomIn}
        aria-label="Zoom in"
        className="flex size-8 items-center justify-center border-b border-black/15 hover:bg-black/10"
      >
        <Plus aria-hidden="true" size={16} />
      </button>
      <button
        type="button"
        onClick={zoomOut}
        aria-label="Zoom out"
        className="flex size-8 items-center justify-center hover:bg-black/10"
      >
        <Minus aria-hidden="true" size={16} />
      </button>
    </div>
  );
}
