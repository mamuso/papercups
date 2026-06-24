export interface CupLocation {
  lat: number;
  lng: number;
}

export interface Cup {
  slug: string;
  name: string;
  address: string;
  city: string;
  country: string;
  created_at: string;
  location: CupLocation;
}

export type CupThumbnail = Pick<Cup, 'slug' | 'name' | 'address'>;

export type CupMapMarker = Pick<Cup, 'slug' | 'name' | 'location'>;

export type CupListItem = Pick<Cup, 'slug' | 'name'>;
