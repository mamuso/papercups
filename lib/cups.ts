import data from '../data/data.json';
import type { Cup, CupListItem, CupMapMarker, CupThumbnail } from '../types/cup';

const cups = data as Cup[];

const cupsBySlug = new Map(cups.map((cup) => [cup.slug, cup]));

export function getAllCups(): Cup[] {
  return cups;
}

export function getCupBySlug(slug: string): Cup | undefined {
  return cupsBySlug.get(slug);
}

export function getCities(): string[] {
  return Array.from(new Set(cups.map((cup) => cup.city)));
}

export function getThumbnailCups(): CupThumbnail[] {
  return cups.map(({ slug, name, address }) => ({ slug, name, address }));
}

export function groupCupsByCity(): Record<string, CupListItem[]> {
  const grouped: Record<string, CupListItem[]> = {};

  for (const cup of cups) {
    (grouped[cup.city] ??= []).push({ slug: cup.slug, name: cup.name });
  }

  return grouped;
}

export function getMapMarkers(): CupMapMarker[] {
  return cups.map(({ slug, name, location }) => ({ slug, name, location }));
}
