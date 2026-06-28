import {
  antonio,
  geistSans,
  kalnia,
  outfit,
  rethinkSans,
  staatliches,
} from './fonts';

export type TitleFontId =
  | 'geist'
  | 'rethink'
  | 'kalnia'
  | 'outfit'
  | 'staatliches'
  | 'antonio';

export type TitleFontStyle = {
  id: TitleFontId;
  className: string;
};

export const TITLE_FONTS: TitleFontStyle[] = [
  {
    id: 'geist',
    className: geistSans.className,
  },
  {
    id: 'rethink',
    className: rethinkSans.className,
  },
  {
    id: 'kalnia',
    className: kalnia.className,
  },
  {
    id: 'outfit',
    className: outfit.className,
  },
  {
    id: 'staatliches',
    className: staatliches.className,
  },
  {
    id: 'antonio',
    className: antonio.className,
  },
];

export function hashTitle(title: string): number {
  let hash = 5381;

  for (let index = 0; index < title.length; index += 1) {
    hash = (hash * 33) ^ title.charCodeAt(index);
  }

  return hash >>> 0;
}

export function getTitleFont(title: string): TitleFontStyle {
  return TITLE_FONTS[hashTitle(title) % TITLE_FONTS.length];
}
