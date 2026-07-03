export const DEFAULT_MARKER_COLOR = '#FF3AA1';

export type CupData = {
  slug: string;
  name: string;
  address: string;
  city: string;
  country: string;
  created_at: string;
  markerColor?: string;
  location: {
    lat: number;
    lng: number;
  };
};

export type CupSize = 'small' | 'large';

export type CupListItem = Pick<CupData, 'slug' | 'name'>;
