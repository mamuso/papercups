export type CupData = {
  slug: string;
  name: string;
  address: string;
  city: string;
  country: string;
  created_at: string;
  location: {
    lat: number;
    lng: number;
  };
};

export type CupSize = "small" | "large";
