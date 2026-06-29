import {
  antonio,
  geistSans,
  kalnia,
  outfit,
  rethinkSans,
  staatliches,
} from './fonts';
import { hashTitle } from './hashTitle';

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

export function getTitleFont(title: string): TitleFontStyle {
  return TITLE_FONTS[hashTitle(title) % TITLE_FONTS.length];
}
