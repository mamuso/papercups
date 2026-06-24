import data from '../data/data.json';
import type { CupData, CupListItem } from '../types/cup';

const cups = data as CupData[];

const cupsBySlug = new Map(cups.map((cup) => [cup.slug, cup]));

export function getAllCups(): CupData[] {
  return cups;
}

export function getCupBySlug(slug: string): CupData | undefined {
  return cupsBySlug.get(slug);
}

export function getCities(): string[] {
  return Array.from(new Set(cups.map((cup) => cup.city)));
}

export function groupCupsByCity(): Record<string, CupListItem[]> {
  const grouped: Record<string, CupListItem[]> = {};

  for (const cup of cups) {
    (grouped[cup.city] ??= []).push({ slug: cup.slug, name: cup.name });
  }

  return grouped;
}

export function getAboutMapMarkers() {
  return cups.map((cup) => ({
    href: `/pour/${encodeURIComponent(cup.slug)}`,
    position: cup.location,
    title: cup.name,
  }));
}
